const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
    name:{
        type:String,
        required:true,
        unique:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('book',bookSchema);