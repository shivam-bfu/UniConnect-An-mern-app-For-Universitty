const userModel=require('../models/UserModel')
const jwt = require("jsonwebtoken");

module.exports.loggIn = async (req, res) => {
    try {
      const guID = req.body.guId;
      const password = req.body.password;      
      const user = await userModel.findOne({ guId: guID }); 
      console.log("MongoDB Query Result:", user);


        if(!user)
        {
            return res.send("ID or Password incorrect user not found")
        }
        const realPassxword=user.password
        console.log(realPassxword)
        console.log(guID)


        if(password !== realPassxword)
            {
            return res.send("ID or Password incorrect ")

            }
            
            const token = jwt.sign(
                {email: user.email },"secret-key");
              res.cookie('token',token)

            res.send('loogin done')


        

    }
    catch(err){
        console.log(err,"errrorr")

    }
  };
  