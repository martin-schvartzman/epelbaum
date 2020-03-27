const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    texto:String,
    fecha:String,
    case_id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId
});

module.exports = mongoose.model('Comment',schema);