const express=require("express");
const app=express();
const port=process.env.PORT||8790;
const embeddedRoute=require("./routes/Embedded")
const referencesRoute=require("./routes/References")

app.use(express.json());

app.use("/embedded",embeddedRoute);
app.use("/references",referencesRoute);

app.get("/",(req,res)=>{
    res.send("Hello Data Modeling")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})