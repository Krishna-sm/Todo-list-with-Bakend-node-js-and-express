const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const model = mongoose.model('todo',schema);
module.exports = model;