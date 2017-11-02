var mongoose = require('mongoose')

const Schema = mongoose.Schema;

var subjectSchema = new Schema ({
  name: String,
  teacher:{
    id: {type: Schema.Types.ObjectId, ref: 'Teacher' },
    name: String},
  classes: [{
    id:{type: Schema.Types.ObjectId, ref: 'Class'}
  }]
})

var Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject;
