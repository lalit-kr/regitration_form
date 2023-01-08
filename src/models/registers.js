const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const Register=new mongoose.model("Employee",employeeSchema);
module.exports=Register;