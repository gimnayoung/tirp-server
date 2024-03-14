const User = require("../models/User");
const bcrypt = require('bcryptjs');
const userController={};

userController.createUser=async(req,res)=>{
    try{
        let {email,password,name,level} =req.body;
        const user = await User.findOne({email:email})
        if(user){
            throw new Error("이미 가입된 email 입니다.");
        }
        const salt= await bcrypt.genSaltSync(10);
        password = await bcrypt.hash(password,salt);

        const newUser = new User({email,password,name,level:level?level:'customer'});
        await newUser.save();
        return res.status(200).json({status:"성공"});
    }
    catch(error){
        return res.status(400).json({status:"fail",error:error.message})
    }
}

userController.getUser=async(req,res)=>{
    try{
        let {userId} =req;
        const user = await User.findById(userId)
        if(user){
            return res.status(200).json({status:"성공",user});
        }
        throw new Error ("토근이 일치하지 않습니다.")
    }
    catch(error){
        return res.status(400).json({status:"fail",error:error.message})
    }
}
module.exports=userController;