const User = require('../model/user');

const getAllUsers = async (req, res,next ) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        return next(err);
    }
    if(!users){
        return res.status(500).json({message:"Internal server error"});
    }


    return res.status(200).json({users});
};

const addUser = async (req, res,next ) => {

    const {username, password, role} = req.body;

    if(!username && 
    username?.trim()=="" &&
    !password && 
    password.length>8){

        return res.status(422).json({message:"Invalid Data"});
    };

    let user;
    try{
        user = new User({
            username,
            password,
            role
        });
    user = await user.save();
    }catch(err){
        return next(err);
    }

    if(!user){
        return res.status(500).json({message:"Unable to add user"});
    }

    return res.status(201).json({user});
};

const updateUser = async (req,res,next ) => {
    const id = req.params.id;
    const {username, password, role} = req.body;

    if(!username && 
    username?.trim()=="" &&
    !password && 
    password.length>8){

        return res.status(422).json({message:"Invalid Data"});
    };
    
    let user;
    
    try{
        user = await User.findByIdAndUpdate(id,{username,password,role});
    }catch(err){
        return next(err);
    }

    if(!user){
        return res.status(500).json({message:"Unable to save user"});
    }
    return res.status(200).json({message: "User updated successfully"});

}

const deleteUser = async (req, res,next ) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndRemove(id);
    }catch(err){
        return next(err);
    }
    if(!user){
        return res.status(500).json({message:"Unable to delete"});
    }
    return res.status(200).json({message: "User has been deleted."});
};


exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
