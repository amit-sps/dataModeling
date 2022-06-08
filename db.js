const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";
module.exports=new MongoClient(url);