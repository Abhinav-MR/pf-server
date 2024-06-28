const projects = require('../Model/projectModel')

//addprojects

exports.addProjects=async (req,res)=>{
    console.log("inside project controller ");
    const{title,languages,github,website,overview}=req.body
    const projectImage = req.file.filename
    const userId = req.payload
    // console.log(title,languages,github,website,overview,projectImage,userId);
    // res.status(200).json("add project request recieved")
    try{
       const existingProject = await projects.findOne({github})
       if(existingProject){
        res.status(406).json("project already exist...")
       }else{
        const newProject = new projects({
            title,languages,github,website,overview,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
       }
    }catch(err){
        res.status(401).json(err)
    }
}

//home projects
exports.getHomeProjects = async(req,res)=>{
    try{
        const allprojects =await projects.find().limit(3)
        res.status(200).json(allprojects)
    }catch(err){
        res.status(401).json(err)
    }
}

//alluserprojects

exports.getAllUserProjects = async(req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);
    const query ={
        languages:{$regex:searchkey,$options:"i"}
    }

    try{
        const allUserprojects =await projects.find()
        res.status(200).json(allUserprojects)
    }catch(err){
        res.status(401).json(err)
    }
}

//userprojects

exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
        const Userprojects =await projects.find({userId})
        res.status(200).json(Userprojects)
    }catch(err){
        res.status(401).json(err)
    }
}

//editProjects

exports.editUserProjects = async(req,res)=>{
    const {title,languages,github,website,overview,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload
    const {pid} =req.params

    try{
        const updateProject = await projects.findOneAndUpdate({_id:pid},{
            title,languages,github,website,overview,projectImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//deleteUserProjects

exports.deleteProjects = async(req,re)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }catch(err){
      res.status(401).json(err)
    }
}