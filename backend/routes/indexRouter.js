const express=require('express')
const route=express.Router()
const passport = require('passport');
const jwt=require('jsonwebtoken');
const userModel=require('../models/UserModel')
const { loggIn } = require('../controllers/authController');
require('../utils/google-Startegy');
const AlumniModel=require('../models/allumni')

route.use(passport.initialize());



route.get('/auth/google',
    passport.authenticate('google', { 
      session: false,
      scope: ['profile', 'email'] 
    })
  );
  
  
  route.get('/auth/user', async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
      const decoded = jwt.verify(token, "secret-key"); 
      
      const user =await userModel.findOne({email: decoded.email})

      res.json({ user: user }); 
    } catch (error) {
      res.status(401).json({ error: 'Invalid Token' });
    }
  });

  
  route.get('/auth/google/callback',
    passport.authenticate('google', { 
      session: false,
      failureRedirect: '/login' 
    }),
    (req, res) => {
        const token = jwt.sign(
            { email: req.user.email }, "secret-key"
        );

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, secure: false });

        // Redirect to home page
        return res.redirect('http://localhost:5173');
    }
);

  

route.get('/', async (req,res)=>{

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = jwt.verify(token, "secret-key");
  const user = await userModel.findOne({ email: decoded.email });

res.json({
  status:200,
  message:'ok',
  data:user,

})

})

route.post("/update-alumni", async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token and get user email
    const decoded = jwt.verify(token, "secret-key"); // Use a secure secret key
    const email = decoded.email;

    // Extract job and company from request body
    const { job, company } = req.body;

    // Find and update the alumni record
    const updatedAlumni = await AlumniModel.findOneAndUpdate(
      { email }, // Find by email from JWT
      { $set: { job, company } }, // Update fields
      { new: true } // Return updated document
    );

    if (!updatedAlumni) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      status: 200,
      message: "Profile updated successfully",
      data: updatedAlumni,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



route.post('/login',loggIn)

module.exports=route;