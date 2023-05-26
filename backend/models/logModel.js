var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    'user' : String,
    'opend' : Date,
   'boxId' : Number,
   'force' : {
    type: Boolean,
    default: false
    }
})

module.exports = mongoose.model('log',logSchema);