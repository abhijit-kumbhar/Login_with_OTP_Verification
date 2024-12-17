const express = require("express");
const dbconnect = require("./config/dbconfig");
const userModel = require("./model/user");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan =require ("morgan"); //This package is used to to , log HTTP requests in a pretty JSON format on console.

app.use(cookieParser());//Extracts the cookie data from the HTTP request and converts it into a usable format that can be accessed by the server-side code.


app.use(morgan("tiny")); //It logs the request information into console with tiny format.   //Whenever we make any http request it will show us on console of VS CODE.

const port = 5300;


app.use(
    cors({
      origin: "http://localhost:5173", //This is front end baseurl
      credentials: true,
    })
  );

app.use(express.json())

//Post API(create student)
app.post('/studentdata', async (req, res) => {
  const { email } = req.body;

  try {
    const dbstudent = await userModel.findOne({ email });

    if (dbstudent) {
      res.status(400).send("Student Already exists");
    } else {
      const data = new userModel(req.body);
      const result = await data.save();
      res.status(201).send(result);
      console.log("Student Registered successfully", result);
    }
  } catch (error) {
    res.status(500).send("Server error");
    console.error("Error:", error);
  }
});


//GET API

app.get('/getStud', async(req,res)=>{ //URL:localhost:5000/api/getEmp
  let data = await userModel.find();
  res.send(data);
  console.log("data", data);
})

app.get('/getStudent/:_id', async(req,res)=>{ //URL:localhost:5000/api/getEmp
  const {_id} = req.params;
  let data = await userModel.find({_id});
  res.send(data);
  console.log("data", data);
})


//PUT API

app.put('/updateStud/:_id', async(req,res)=>{ //URL:localhost:5000/api/updateEmployee/666971e30061c7a74460f85e
 console.log("update api")
  let data = await userModel.updateOne(req.params, {$set: req.body});
  console.log(data)
  console.log("updated successfully", data)
  res.send(data);
 
})

//DELETE API (Delete Student data)
app.delete("/deleteStud/:_id",async(req,res)=>{
      console.log(req.params);
      let data=await userModel.deleteOne(req.params);
      res.send(data);
})
  
dbconnect();

  
app.listen(port, () => {
  console.log("server is running on port", port);
  userModel();
});