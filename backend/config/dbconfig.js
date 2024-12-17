const mongoose=require('mongoose');//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that helps with database management and interactions
const dotenv = require('dotenv')

const url= "mongodb://localhost:27017/StudentInfo";

//mongodb://localhost:27017/StudentInfo

const dbconnect=async()=>{
    await mongoose.connect(url);
    console.log(("Connected to mongodb"));
};

module.exports=dbconnect;
