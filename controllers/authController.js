const bcrypt = require('bcryptjs');
const User= require('../models/User');
const authController={};
const jwt=require('jsonWebtoken');
require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

authController.loginWithEmail=async(req,res)=>{
    try{
        let {email,password} =req.body;
        const user = await User.findOne({email:email});
        if(user){
           const isMatch= await bcrypt.compare(password,user.password);
           if(isMatch){
            const token =await user.generateToken();
            return res.status(200).json({status:"success",user,token});
           }
        }
        throw new Error("이메일 혹은 비밀번호가 일치하지 않습니다.")
    }
    catch(error){
        return res.status(400).json({status:"fail",error:error.message})
    }
}

authController.authenticate=async(req,res,next)=>{
    try{
        const tokenString=req.headers.authorization
        if(!tokenString) throw new Error ("기간이 만료 되었습니다.")
        const token = tokenString.replace("Bearer ","");
        jwt.verify(token,JWT_SECRET_KEY,(error,payload)=>{
           if(error) throw new Error ("토큰이 없습니다.")
           req.userId= payload._id
        });
        next();
    }
    catch(error){
        return res.status(400).json({status:"fail",error:error.message})
    }
}

module.exports=authController;