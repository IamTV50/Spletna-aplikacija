var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boxSchema = new Schema({
    'name' : String,
    'boxId' : Number
});

module.exports = mongoose.model('box',boxSchema);