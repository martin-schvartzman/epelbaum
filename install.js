(async () => {

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/epelbaum');

const User = require('./models/user');

const admin = new User({
    username:'admin',
    hash:bcrypt.hashSync('password',10)
})

await admin.save();

})()