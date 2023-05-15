const User = require('../models/user');
const Report = require('../models/report')
const db = require('../mongoose.js')

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  const secretKey = "secretkey"

  module.exports.register = (req, res) => {
    const { email, password,name,user_type,phone } = req.body;

    if(user_type === "Doctor"||user_type === "doctor")

    {

    console.log(req.body," --> ",email,password,name,user_type,phone)
  
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Email already taken' });
        }
  
        return bcrypt.hash(password, 10);
      })
      .then((hashedPassword) => {
        const newUser = new User({
          email,
          password: hashedPassword,
          name,
          user_type,
          phone
        });
  
        return newUser.save();
      })
      .then(() => {
        res.status(201).json({ message: 'User created successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });
    }

    else {
        res.status(400).json({message:"User type not allowed"})
       
    }
  };

  module.exports.registerPatient = (req, res) => {

    const { email, password,name,user_type,phone } = req.body;

    if(user_type === "Patient"||user_type === "patient")

    {

    console.log(req.body," --> ",email,password,name,user_type,phone)
  
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Email already taken' });
        }
  
        return bcrypt.hash(password, 10);
      })
      .then((hashedPassword) => {
        const newUser = new User({
          email,
          password: hashedPassword,
          name,
          user_type,
          phone
        });
  
        return newUser.save();
      })
      .then(() => {
        res.status(201).json({ message: 'User created successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });
    }

    else {
        res.status(400).json({message:"User type not allowed"})
       
    }




  }

  module.exports.createReport = (req,res)=>{

    const {status} = req.body

    const token = localStorage.getItem('token')

    var email

    jwt.verify(token, secretKey, (error, decodedToken) => {
      if (error) {
        console.error('Error verifying session token:', error);
        // Handle the error appropriately
      } else {
        // Access the desired information from the decoded token
       
        email = decodedToken.email;
        // Use the extracted information as needed
        console.log('Email:', email);
      }
    });

    const newReport = new Report({
        patient_id:req.params.id,
        created_by:email,
        status,
        date:Date.now()
    })

    return newReport.save()

    .then(() => {
      res.status(201).json({ message: 'Report created successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
    });



  }

  module.exports.statusReport = (req,res)=>{
    const status = req.params.status
    
    async function statusReport(){

      try{
         const results = await Report.find({status:status}).exec()
    
        console.log(results)
        res.status(200).json({message:results})

      }

      catch(err){
        console.error('Error retrieving reports:', err);
      }
    }

    statusReport()

  }
  

  module.exports.allReports = (req,res)=>{

   const  patient_id = req.params.id


   async function getReports() {

   try {
    const reports = await Report.find({ patient_id:patient_id }).sort({ date: 1 }).exec();
    
    res.status(200).json({message:reports})
  } catch (err) {
    console.error('Error retrieving reports:', err);
  }
    // Print the reports
   
   }

    getReports()

  }


  module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

 

    var user1

    User.findOne({ email })
      .then((user) => {
         user1 = user
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        return bcrypt.compare(password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        const token = jwt.sign(
          { userId: user1._id, email: user1.email },
          secretKey, // Replace with your own secret key
          { expiresIn: '1h' }
        );
  
        localStorage.setItem('token',token)
  
        next();
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });
  };

module.exports.check_user = (req,res,next)=>{

    const token = localStorage.getItem('token')

  
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err)
        {
        res.status(401).json({message:"Unauthorized"})
        }
        else{
        req.decoded = decoded;
        console.log(decoded)
        next();
        }
    })

}

module.exports.logout = (req,res)=>{
    localStorage.removeItem('token')
    res.redirect(200,'/users/doctors/login')
}
