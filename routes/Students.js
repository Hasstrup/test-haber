var express = require('express')
var router = express.Router({mergeParams: true});
var Student = require('../models/Students')
var Class = require('../models/classes')
var Subject = require('../models/subjects')
var Teacher = require('../models/teachers')

// getting all the students in the school
router.get('/api/students', function(req, res){
 Student.find({}, function(err, students){
   if(err) {
     console.log('Something went wrong getting the students');
     console.log(err)
   } else {
      res.json({students: students})
   }})})

//gets a student in the public student directory && his deets
router.get('/api/students/:id', function(req, res) {
    Student.findById(req.params.id, function(err, student){
          if(err){
            console.log('the problem is with me 1')
            console.log(err)
          } else {
            Class.findById(student.Class.id, function(err, sclass){
              if(err){
                console.log(err + 'there is an error')
              } else {
                var classstudents = []
                var classsubjects = [];
                sclass.students.forEach(function(students){
                  Student.findById(students._id, function(err, student){
                    if(err){
                      console.log(err + 'there is an error here')
                    } else {
                      classstudents.push(student)
                    }})})
                    sclass.subjects.forEach(function(subject){
                      Subject.findById(subject._id, function(err, subjects){
                        if(err){
                          console.log(err + 'there is an error here2')
                        } else {
                          classsubjects.push(subjects)
                        }})})
                        Teacher.findById(sclass.classteacher.id, function(err, classteacher){
                          if(err){
                            console.log(err + 'there is another error')
                          } else {
                            res.json({student: student, sclasss: sclass, classmates: classstudents, subjects: classsubjects, classteacher: classteacher})
                          }})}})}})})

////======= CREATE VIEW & LOGIC

//Create view function // renders a form
router.get('/api/registerstudents', function(req, res){
  Class.find({}, function(err, classes){
    if(err) {
      console.log('the problem is with me 3')
      console.log(err)
    } else {
      res.json({classes: classes })
    }
  })
})

// CREATE LOGIC
router.post( '/api/students', function(req, res){
   //remember this has to be an id
   var studentt = req.body
   var Stud = new Student({firstname: studentt.firstname, lastname: studentt.lastname, image: studentt.image,
                          age: studentt.age})
      Stud.save(
        function(err, stude){
        if(err){
          console.log(err)
        } else {
          console.log(studentt.Class)
          stude.Class.id = studentt.Class
          stude.save();
          Class.findById(studentt.Class, function(err, classs){
            if(err){
              console.log(err)
            } else {
              classs.students.push(stude);
              classs.save();
            }
          })
          res.json({stude: stude})
          }})})

// ======== EDIT VIEW AND LOGIC

//editing from public folder
router.get('/api/students/:id/edit', function(req, res) {
  Student.findById(req.params.id, function(error, student) {
    if(error) {
      console.log('the problem is with me 4')
        console.log(error)
    } else {
      Class.find({}, function(err, classes){
        if(err){
          console.log(err)
        } else {
          res.json({student: student, classes:classes})
        }})}})})

router.put('/api/students/:id', function(req, res, next){
  var update = req.body;
  console.log('here wre' + update.Class)
  Student.findByIdAndUpdate(req.params.id, {$set: {firstname: update.firstname,
    lastname: update.lastname, image: update.image, age: update.age,
  }}, function(err, stud){
    if(err) {
      console.log(err + 'problem is here1')
    } else {

      console.log('this is the value' + req.body.Class)
      Class.findById(req.body.Class, function(err, sclass){
        if(err){
          console.log('problem is here2')
        } else {
          stud.Class.id = sclass._id
          stud.save(); 
          if ( sclass.students.indexOf(`${stud._id}`) === null ) {
            sclass.students.push(stud);
            sclass.save();

          } else {
            res.json({})
          }}})}})})



router.delete('/api/students/:id', function(req, res, next){
  Student.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log('the problem is with me 6')
      console.log(err)
    } else {
      res.json({});
    }})})



module.exports = router;
