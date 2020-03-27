const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username : { type:String,unique:true,required:true,dropDups:true },
    hash: { type:String,required:true }
});

module.exports = mongoose.model('User',schema);