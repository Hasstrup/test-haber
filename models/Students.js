var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var studentSchema = new Schema ({
  firstname: {type: String},
  lastname: {type: String},
  image: String,
  age: {type: Number}, //remember the middleware for this
  Class: {id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class'}, name: String, required:false }
})


module.exports = mongoose.model('Student', studentSchema)
