const mongoose = require('mongoose');
const URI = "mongodb+srv://harsh:harsh@cluster0.pfcl4nw.mongodb.net/bxtend?retryWrites=true&w=majority";

const dbConnection = async () => {
 try{
      const result = await mongoose.connect(URI);
      if(result){ console.log("database connected sucessfuly")}
      else {console.log("database not connected successfuly")}
 }catch(err){
    console.log(err);
 }
}

module.exports = dbConnection;