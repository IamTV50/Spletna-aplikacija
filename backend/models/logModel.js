var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    'user' : String,
    'opend' : Date,
    'user_id' : {
          type: Schema.Types.ObjectId,
          ref: 'user',
          requried: false
   },
   'boxId' : Number,
   'force' : {
    type: Boolean,
    default: false
    }
})

module.exports = mongoose.model('log',logSchema);