const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')
// register
exports.register=async(req,res)=>{
     const{username,email,password}=req.body
     console.log("inside register controller function");
     try{
    const existingUser = await users.findOne({email})
    console.log(existingUser);

    if(existingUser){
        res.status(406).json("User already exist!!please login..")
    }else{
        const newUser =new users({
            username,email,password,profile:"",github:"",linkedin:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
}catch(err){
    res.status(401).json(err)
}
}
//login
exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const existingUser = await users.findOne({email,password})
        console.log(existingUser);
    
        if(existingUser){
            //generate token
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json("Invalid Email/Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}