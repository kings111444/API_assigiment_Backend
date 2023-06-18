const Cat = require('../model/cat');

const getAllCats = async (req, res,next ) => {
    let cats;
    try{
        cats = await Cat.find();
    }catch(err){
        return next(err);
    }
    if(!cats){
        return res.status(500).json({message:"Internal server error"});
    }


    return res.status(200).json({cats});
};

const addCat = async (req, res,next ) => {

    const {name,gender,age,color,weight,breed} = req.body;

    if(!name && 
    name?.trim()=="" &&
    !gender && 
    gender?.trim()=="" &&
    !age && 
    age?.trim()=="" &&
    !color && 
    color?.trim()=="" &&
    !weight && 
    weight?.trim()=="" &&
    !breed && 
    breed?.trim()==""){

        return res.status(422).json({message:"Invalid Data"});
    };

    let cat;
    try{
        cat = new Cat({
            name,
            gender,
            age,
            color,
            weight,
            breed
        });
    cat = await cat.save();
    }catch(err){
        return next(err);
    }

    if(!cat){
        return res.status(500).json({message:"Unable to add user"});
    }

    return res.status(201).json({cat});
};

const updateCat = async (req, res,next ) => {
    const id = req.params.id;
    const {name,gender,age,color,weight,breed} = req.body;

    if(!name && 
        name?.trim()=="" &&
        !gender && 
        gender?.trim()=="" &&
        !age && 
        age?.trim()=="" &&
        !color && 
        color?.trim()=="" &&
        !weight && 
        weight?.trim()=="" &&
        !breed && 
        breed?.trim()==""){
    
            return res.status(422).json({message:"Invalid Data"});
        };
    
    let cat;
    
    try{
        cat = await Cat.findByIdAndUpdate(id,{name,gender,age,color,weight,breed});
    }catch(err){
        return next(err);
    }

    if(!cat){
        return res.status(500).json({message:"Unable to save cat data"});
    }
    return res.status(200).json({message: "Cat data updated successfully"});

}

const deleteCat = async (req, res,next ) => {
    const id = req.params.id;
    let cat;
    try{
        cat = await Cat.findByIdAndRemove(id);
    }catch(err){
        return next(err);
    }
    if(!cat){
        return res.status(500).json({message:"Unable to delete"});
    }
    return res.status(200).json({message: "Cat data has been deleted."});
};

// const getCatById = async (req,res,next) => {
//     const id = req.params.id;
//     let cat;
//     try{
//         cat = await Cat.findById(id);
//     }catch(err){
//         return next(err);
//     }
//     if(!cat){      
//         return res.status(404).json({message:"Unable to find cat"});
//     }
//     return res.status(200).json({cat});
// };

const searchCat = async (req,res,next) => {
    let cat
    console.log(req.query);
try{
    cat = await Cat.find(req.query);
}catch(err){
    return next(err);
    }
    if(!cat){      
        return res.status(404).json({message:"Unable to find cat"});
    }
    return res.status(200).json({cat});
};

exports.getAllCats = getAllCats;
exports.addCat = addCat;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;
exports.searchCat = searchCat;