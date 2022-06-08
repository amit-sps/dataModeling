const route=require("express").Router()
const connection=require("../db")
const dbName="softprodigyintern";
route.post("/",async(req,res)=>{
    try{
        const{name,contact,address}=req.body;
        const dataToSave={name,contact,address}
        await connection.connect()
        const db=connection.db(dbName)
        const collection=db.collection("userEmbedded");
        const isCreated=await collection.insertOne(dataToSave)
       if(!isCreated)
       return res.status(400).send("something went wrong!");
       return res.status(200).send("Data created!");

    }catch(err){
        console.log(err);
        return res.status(400).send("something went wrong!");
    }
})



route.get("/",async(req,res)=>{
    try{
        await connection.connect()
        const db=connection.db(dbName)
        const collection=db.collection("userEmbedded");
        const isData=await collection.find({}).toArray();
        if(!isData)
       return res.status(400).send("something went wrong!");
       return res.status(200).send(isData);

    }catch(err){
        console.log(err);
        return res.status(400).send("something went wrong!");
    }
})

module.exports=route