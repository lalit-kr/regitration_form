const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:/registers')
.then(()=>{console.log("Connection Successful!")})
.catch((e)=>{console.log("Connection Failed!")});