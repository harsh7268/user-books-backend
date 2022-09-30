const {  validationResult } = require('express-validator');
const books = require("../model/books");

const createBook = async (req,res) =>{
    let success = false;
   //If there are errors, Return bad request and  the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({success, errors: errors.array() });
   }
   try{
    const {name,imgUrl,author,pages,price} = req.body;
   // check whether the  book exist already
   let book = await books.findOne({name});
   if(book){
     return res.status(400).json({success,error:'sorry  this book already exists'})
   }
   //create new book
   book = await  books.create({ user:req.user.id,name,imgUrl,author,pages,price});
  success = true;
 return res.status(200).json({success,response:book});

  }catch(error){
    console.error(error.message);
   return  res.status(500).send("Inertnal Server Error");
  }
}

const getBook = async (req,res) =>{
    try{
        const userId = req.user.id;
        const book = await books.find({user:userId});
        res.status(200).json({response:book});
        }catch(error){
            console.error(error.message);
           return  res.status(500).send("Inertnal Server Error");
        }
}

const updateBook = async (req,res) =>{ 
    try{
        let update = await books.findById(req.params.id);
        if(!update){
            return res.status(400).json('data not found');
        }
        if(req.user.id!==update.user.toString()){
            return res.status(400).json('method not allowed');
        }
         update = await books.findByIdAndUpdate(req.params.id,req.body,{new:true});
       return res.status(200).json({"Success":"Data has been updated",update});
        }catch(error){
            console.error(error.message);
            return  res.status(500).send("Inertnal Server Error");
        }
}

const deleteBook = async (req,res) =>{
    try{
        let book = await books.findById(req.params.id);
        if(!book){
            return res.status(400).json('data not found');
        }
        if(req.user.id!==book.user.toString()){
            return res.status(400).json('method not allowed');
        }
     book = await books.findByIdAndDelete(req.params.id);
    return res.status(200).json({"Success":"book has been deleted",book});
    }catch(error){
        console.error(error.message);
        return  res.status(500).send("Inertnal Server Error");
    }
}


module.exports = {createBook,getBook,updateBook,deleteBook}