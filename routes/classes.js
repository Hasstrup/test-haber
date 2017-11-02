var express = require('express')
router = express.Router({mergeParams: true})
var Class = require('../models/classes')
var Subject = require('../models/subjects')
var Teacher = require('../models/teachers')
var Students = require('../models/Students')



router.get('/api/classes',  function(req, res) {
    Class.find({}, function(err, classes) {
      if(err){
        console.log('problem getting the classes')
      }  else {
              res.json({classes: classes})
          }
        })})


router.get('/api/classes/:id', function(req, res){
    Class.findById(req.params.id, function(err, newclasss){
      if(err){
        console.log('Something went wrong fetching your guy1')
        console.log(err)
      } else {
        let s_tudents = [];
        let s_ubjects = []
        newclasss.subjects.forEach(function(subject){
          console.log(subject._id)
          Subject.findById(subject._id, function(err, classSubjects){
            if(err) {
              console.log(err)
            } else {
              console.log(classSubjects)
              s_ubjects.push(classSubjects)}  })})
              newclasss.students.forEach(function(student){
                Students.findById(student._id, function(err, classStudents){
                  if(err) {
                    console.log(err)
                  } else {
                    console.log(classStudents)
                    s_tudents.push(classStudents)}  })})
                  Teacher.findById(newclasss.classteacher.id, function(err, classteacher){
                    if(err){
                      console.log(err)
                    } else { }
                      res.json({classs: newclasss, s_tudents: s_tudents, classteacher: classteacher, s_ubjects: s_ubjects})}  )}})})


router.get('/api/registerclasses', function(req, res) {
  Subject.find({}, function(err, subjects){
    if(err) {
      console.log(err)
    } else {
        Teacher.find({}, function(err, teachers){
          if(err){
            console.log(err)
          } else {
            Students.find({}, function(err, students){
              if(err){
                console.log(err)
              } else {
                res.json({subjects: subjects, teachers: teachers, students: students})
              }})}})}})})



router.post('/api/classs', function(req, res){
    let classs = req.body
  var Classe = new Class ({name: req.body.name});
  Classe.save(function(err, classe){
    if(err){
      console.log(err + 'something went wrong here')
    } else {
        classs.students.forEach(function(student){
          Students.findById(student, function(err, items){
            if(err){
          console.log(err)
          } else {
          classe.students.push(items)
          classe.save()
          items.Class.id = classe._id
          items.save()
          }})})
              classe.classteacher.id = classs.classteacher;
              classe.save();
              classs.subjects.forEach(function(subject){
                console.log('these are the subjects' + '' + subject)
              Subject.findById(subject, function(err, items){
                if(err){
                  console.log(err)
                } else {
                  classe.subjects.push(items)
                  classe.save()
                }})})
                  classe.save(function(err, classex){
                    if(err){console.log(err + 'blah blah blah')}
                    else {
                      Teacher.findById(classex.classteacher.id, function(err, teacherx){
                        if(err){
                          console.log(err + 'somethhing aha ')
                        } else {
                          classex.classteacher.name = teacherx.firstname + " "  + teacherx.lastname
                          classex.save()
                          teacherx.Class.id = classe._id;
                           teacherx.isClassTeacher = 'true'
                           teacherx.save()
                          res.json({}) }})}})}})})


router.get('/api/classes/:id/edit', function(req, res){
    Class.findById(req.params.id, function(err, classs){
      if(err){
        console.log('Something went wrong fetching your guy2')
        console.log(err)
      } else {
        Teacher.find({}, function(err, teachers){
          if(err){
            console.log(err)
          } else {
            res.json({classs: classs, teachers: teachers})
          }})}})})


router.put('/api/classs/:id', function(req, res){
  var update = req.body;
  Class.findByIdAndUpdate(req.params.id, {$set: {name: update.name}}, function(err, classs){
    if(err) {
      console.log(err)
    } else {
      classs.classteacher.id = req.body.classteacher
      classs.save();
      res.json({class:classs})
    }})})



router.delete('/api/classs/:id', function(req, res){
  Class.findByIdAndRemove(req.params.id, function(err, classs){
    if(err) {
      console.log(err)
    } else {
      res.json({})
    }})})

module.exports = router;
