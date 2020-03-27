const router = require('express').Router();
const User = require('../models/user');
const config = require('../config')

router.get('/auth/login',(req,res,next) => {
    res.render('login');
});

router.post('/auth/login', async (req,res,next) => {
    const { username,password } = req.body;
    const user = await User.findOne({username}).exec();

    if(user === null){
        return res.redirect('/auth/login');
    }

    if(verifyPassword(user.hash,password)){
        const token = createJwt(user);
        res.cookie('auth-token',token);
        res.render('home');
        return;
    }else{
        return res.redirect('/auth/login')
    }
});

//REFACTOR send to utils
const bcrypt = require('bcryptjs');
const verifyPassword = (hash,password) => {
    return bcrypt.compareSync(password,hash)
}

//REFACTOR send to utils
const jwt = require('jsonwebtoken');
const createJwt = (obj) => {
    return jwt.sign(obj,config.secretKey);
}

module.exports = router;