const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddileware')
const multerConfig = require('../Middlewares/multerMiddileware')
//register

router.post('/user/register',userController.register)

//login

router.post('/user/login',userController.login)

//addProjects

router.post('/addprojects',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

//getHomeProjects
router.get('/homeprojects',projectController.getHomeProjects)

//getAlluserProjects
router.get('/alluserprojects',jwtMiddleware,projectController.getAllUserProjects)

//getUserProjects
router.get('/userprojects',jwtMiddleware,projectController.getUserProjects)

//editproject
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProjects)

//deleteproject

router.delete('/projects/remove/:pid',jwtMiddleware,projectController.deleteProjects)

module.exports=router