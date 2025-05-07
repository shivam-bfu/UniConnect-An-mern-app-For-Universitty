const express=require('express')
const route=express.Router()
// const postModel=require('../models/postModel')
const jwt=require('jsonwebtoken')
const userModel=require('../models/UserModel')
const multer = require("multer");
const profModel =require('../models/profModel')
const pdfModel=require('../models/pdfModel')

const storage = multer.memoryStorage(); // Stores file in memory as buffer
const upload = multer({ storage: storage });

route.get('/',(req,res)=>{
    res.render('pdf')
})

route.post('/upload', upload.single('pdf'), async (req,res)=>{

    const name=req.body.name
    
 
    const token=  jwt.verify(req.cookies.token,"secret-key")
    const email=token.email
    console.log(email)
    const prof = await profModel.findOne({ email: email });
    console.log(prof)

    const newPdf = await pdfModel.create({
        filename: name,
        data: req.file.buffer, // Store as Buffer
        contentType: req.file.mimetype,
        date: new Date().toISOString(), // Save as string
        uploadDate: Date.now(),
        user: prof._id
    });

    prof.pdf.push(newPdf._id)
    await prof.save();

    res.send(newPdf)



})
module.exports=route;