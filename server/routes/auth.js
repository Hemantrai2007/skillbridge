import express from "express";
import { user_info } from "../model/user_info.js";
import { sendOTPtoMail } from "../configs/mailotp.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await user_info.find({ email });
    if (user.length === 1) {
      return res.status(500).json({ success: false, message: "Account already exist !!" });
    }
    user = await user_info.create({ user_name: name, email, password });

    return res.status(200).json({ success: true, message: "Account Created" });
  }
  catch (error) {
    console.log("Problem in signup");
    return res.status(500).json({ success: false, message: "internal server error" });
  }
});



router.post("/signin", async (req, res) => {
  try {

    const { email, password } = req.body;

    let user = await user_info.find({ email });

    if (user.length === 1 && user[0].password === password) {
      return res.status(200).json({
        success: true,
        message: "Successfully LogIn"
      });
    }
    else if (user.length === 1 && user[0].password !== password) {
      return res.status(500).json({
        success: false,
        message: "Incorrect Password"
      });
    }
    else {
      return res.status(500).json({
        success: false,
        message: "User not Exist"
      });
    }
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    }
    );
  }
})

router.post("/check-email", async (req, res) => {

  try {
    const { email } = req.body;
    const user = await user_info.findOne({ email });
    if (user) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      user["otp"] = otp;
      user["otp_exp_date"] = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();
      sendOTPtoMail(email, otp);
      res.json({
        success: true,
        message: "OTP SEND"
      });
    }
    else {
      res.json({
        success: false,
        message: "Email not found"
      });
    }
  }
  catch (error) {
    res.json({
      success: false,
      message: "server error"
    });
  }
});

router.post("/verify_otp", async (req,res) => {
  try{
  const { email,otp } = req.body;
  const user = await user_info.findOne({ email });
  
  if(user && user["otp"]===otp){
    res.status(200).json({
      success:true,
      message:"Successfull Verification"
    });
  }
  else{
    res.status(500).json({
      success:false,
      message:"Invalid Otp"
    });
  }}
  catch(error){
    res.status(500).json({
      success:false,
      message:"server error"
    });
  }
});


router.post("/reset_password", async(req,res) =>{

  try{
    // console.log(req);
    const{email,new_password,OTP}=req.body;
    const user= await user_info.findOne({email});
    console.log(user)
    if(user && user["otp"]===OTP && Date.now()<user["otp_exp_date"]){
      user["password"]= new_password;
      await user.save();
      res.status(200).json({
        success:true,
        message:"Successfully Reset"
      });
    }
    else{
      res.status(500).json({
      success:false,
      message:"Jana Bewade"
    });
  
    }

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    });
  }

});


export const auth_router = router;




