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
        return res.status(500).json({message:"Unable to add Cat"});
    }

    return res.status(201).json({message:"Added Cat"});
};

const updateCat = async (req, res,next ) => {
    
    const {id,name,gender,age,color,weight,breed} = req.body;
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
    const {id} = req.body;
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

const searchCat = async (req, res, next) => {
    const { name, gender } = req.query;
    let query = {};
  
    if (name) {
      query.name = name;
    }
    if (gender) {
      query.gender = gender;
    }
  
    try {
      const cats = await Cat.find(query);
      if (!cats.length) {
        return res.status(404).json({ message: 'Unable to find cats' });
      }
      return res.status(200).json({ cats });
    } catch (err) {
      return next(err);
    }
  };
  

const getCatId = async (req, res,next ) => {
    let cats;
    try{
        cats = await Cat.find();
    }catch(err){
        return next(err);
    }
    if(!cats){
        return res.status(500).json({message:"Internal server error"});
    }


    const catIds = cats.map((cat) => ({ _id: cat._id, name: cat.name }));

    return res.status(200).json({ catIds });
};

exports.getAllCats = getAllCats;
exports.addCat = addCat;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;
exports.searchCat = searchCat;
exports.getCatId = getCatId;