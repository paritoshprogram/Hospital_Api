const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');


router.post('/doctors/register', usersController.register);

router.post('/patients/register',usersController.check_user,usersController.registerPatient)

router.get('/doctors/profile/:id',usersController.check_user,(req,res)=>{

    
    res.status(200).json({message:req.params.id+" is logged in"})

})

router.post('/doctors/login', usersController.login,(req,res)=>{
    
    if(res.statusCode === 200)
    {
        const id = req.body.email
        console.log(res.statusCode)

        return res.redirect(`/users/doctors/profile/${id}`)
    }

    else {
        return res.redirect('users/doctors/login')
    }


});

router.get('/doctors/logout',usersController.logout)




module.exports = router;