var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boxSchema = new Schema({
    'name': String,
    'boxId': Number,
    'user_id': [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  });
  
module.exports = mongoose.model('box',boxSchema);