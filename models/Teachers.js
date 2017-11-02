var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var teacherSchema = new Schema ({
    firstname: String,
    lastname: String,
    image: String,
    isClassTeacher: String,
    Class: {id: {type: Schema.Types.ObjectId, ref: 'Class'}, name: String },
    subject: { id:{type: Schema.Types.ObjectId, ref: 'Subject'}, name: String}
})

module.exports = mongoose.model('Teacher', teacherSchema)
