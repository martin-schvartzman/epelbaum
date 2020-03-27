const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/user/list',async (req,res,next) => {
    const users = await getAllUsers();
    res.render('users',{users});
});

router.post('/user', async (req,res,next) => {
    const { username,password } = req.body;
    const hash = bcrypt.hashSync(password,10);
    try{
        const savedUser = await saveUser({
            username,
            hash
        });
        res.redirect('/user/list');
    }catch(err){
        next(err)
    }
})

router.get('/user/delete/:id',async (req,res,next) => {
    const userId = req.params.id;
    await deleteUser(userId);
    res.redirect('/user/list');
} );

const getAllUsers = () => {
    return new Promise( (resolve,reject) => {
        User.find( (err,users) => {
            if(err)return reject(err);
            resolve(users);
        } );
    } );
}

const saveUser = async (userObj) => {
    await User.init();
    const user = new User(userObj);
    return user.save();
}

const deleteUser = (userId) => new Promise( (resolve,reject) => {
    User.deleteOne({_id:userId},(err,result) => {
        if(err)return reject(err);
        resolve(result);
    })
} );

module.exports = router;