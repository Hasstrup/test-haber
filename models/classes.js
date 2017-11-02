var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name: String,
    classteacher: {
      id: {type: Schema.Types.ObjectId, ref: 'Teacher'}, name: String },
    subjects: [{id: {type: Schema.Types.ObjectId, ref: 'Subject'}}],
    students: [{id: {type: Schema.Types.ObjectId, ref: 'Student'}}]
  })

  var Class = mongoose.model('Class', classSchema)

  module.exports = Class;
