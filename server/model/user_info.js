import mongoose from "mongoose";
const user_info_schema=new mongoose.Schema({
  user_name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  otp:{type:String,default:null},
  otp_exp_date:{type:Date,default:Date.now()},
},{timestamps:true});
export const user_info= mongoose.model("user_info",user_info_schema);