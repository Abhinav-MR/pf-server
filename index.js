//loads env file contents into process.env by default

require ('dotenv').config()
const express = require ('express')
const cors =require ('cors')
const router = require('./Router/router')
require('./DB/connection')

const pfServer = express()

//data sharing 
pfServer.use(cors())

//parse json

pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pf-server started listening at PORT:${PORT},and waiting for the client request `);
})


pfServer.get('/',(req,res)=>{
    res.send('<h1>Project-fair server started and waiting for the client request.....</h1>')
})

pfServer.post('/',(req,res)=>{
    res.send('post request')
})
pfServer.put('/',(req,res)=>{
    res.send('put request')
})