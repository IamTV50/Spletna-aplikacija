var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    'user' : String,
    'opend' : Date,
    'user_id' : {
          type: Schema.Types.ObjectId,
          ref: 'user'
   },
   'boxId' : Number
})

module.exports = mongoose.model('log',logSchema);