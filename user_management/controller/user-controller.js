const User = require('../model/user');
const bcrypt = require('bcrypt');

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
            password: bcrypt.hashSync(password, 10),
            role
        });
    user = await user.save();
    }catch(err){
        return next(err);
    }

    if(!user){
        return res.status(500).json({message:"Unable to add user"});
    }

    return res.status(201).json({message:"User added"});
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
        user = await User.findByIdAndUpdate(id,{username,password: bcrypt.hashSync(password, 10),role});
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

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  if (user.role === 'staff') {
    res.status(200).json({user, message: "Staff"})
  }else{
    res.status(200).json({message: "Welcome"});
  }
 
}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
