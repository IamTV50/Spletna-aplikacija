var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    'user' : String,
    'opend' : Date,
    'user_id' : {
        type: Schema.Types.ObjectId,
        ref: 'user'
   },
   'box_id' : {
        type: Schema.Types.ObjectId,
        ref: 'boxes'
   }
})

module.exports = mongoose.model('log',logSchema);