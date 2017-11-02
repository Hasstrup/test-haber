var express = require('express')
var router = express.Router({mergeParams: true});
var Teacher = require('../models/teachers')
var Subject = require('../models/subjects')
var Student = require('../models/Students')
var Class = require('../models/classes')

//Viewing the teachers
router.get('/api/teachers',  function(req, res) {
      Teacher.find({}, function(err, teachers){
        if(err){
          console.log(err)
        } else {
          res.json({teachers: teachers})
        }
      })
})

router.get('/api/teachers/:id', function(req, res){
  Teacher.findById(req.params.id, function(err, teacher){
    if(err) {
      console.log(err)
    } else {

      let blach = [ ]
      console.log(blach)
      if(teacher.isClassTeacher === 'true'){
        Class.findById(teacher.Class.id, function(err, classe){
          if(err){
            console.log(err)
          } else {
            classe.students.forEach(function(student){
              Student.findById(student._id, function(err, items){
                if(err){
                  console.log(err)
                } else {
                  blach.push(items)}})})
                  Subject.findById(teacher.subject.id, function(err, subject){
                    if(err){
                      console.log(err)}
                      else {
                        res.json({teacher: teacher, subject: subject, studentArray: blach, classe:classe})
                    }})}})}
                   else {
                Subject.findById(teacher.subject.id, function(err, subject){
                  if(err){
                    console.log(err)}
                    else {
                      res.json({teacher: teacher, subject: subject})
                  }})}}})})

//creating new teachers
router.get('/api/registerteachers', function(req, res) {
  Subject.find({}, function(err, subjects){
    if(err) {
      console.log(err)
    } else {
      res.json({subjects: subjects})
    }
  })
})
 // creating the logic
router.post('/api/teachers',  function(req, res){
  var teacch = req.body
  var Teach = new Teacher({firstname: teacch.firstname, lastname: teacch.lastname, image: teacch.image, isClassTeacher: 'false' })
  Teach.save(function(err, newteacher){
    if(err) {
      console.log(err)
    } else {
          Subject.findById(teacch.subject, function(err, subject){
            if(err){
              console.log(err)
            } else {
              subject.teacher.id = newteacher._id;
              subject.teacher.name = newteacher.firstname + '' + newteacher.lastname
              subject.save()
              newteacher.subject.id = teacch.subject;
              newteacher.subject.name = subject.name;
              newteacher.save();
              res.json({teacher: newteacher})
            }
          })
        }})})




 //EDITING ROUTES
 router.get('/api/teachers/:id/edit', function(req, res){
   Teacher.findById(req.params.id, function(err, teacher){
     if(err){
       console.log(err)
     } else {
       Subject.find({}, function(err, subjects){
         if(err){
           console.log(err)
         } else {
            res.json({teacher: teacher, subjects: subjects})
         }})}})})

 router.put('/api/teachers/:id', function(req, res){
   var update = req.body;
   Teacher.findByIdAndUpdate(req.params.id, {$set: {firstname: update.firstname,
     lastname: update.lastname, image: update.image,
   }}, function(err, teacher){
     if(err) {
       console.log(err)
     } else {
       Subject.findById(update.subject, function(err, subject){
         if(err){
           console.log(err)
         } else {
           teacher.subject.id = subject._id
           teacher.save();
           subject.teacher.id = teacher._id;
           subject.teacher.name = teacher.firstname + teacher.lastname
           res.json({teacher:teacher, subject:subject})
         }
       })}})})




//deleting the teachers
router.delete('/api/teachers/:id', function(req, res){
  Teacher.findByIdAndRemove(req.params.id, function(err, teacher){
    if(err){
      console.log(err)
    } else {
      res.json({teacher: teacher})
    }
  })
})

module.exports = router;
