var mongoose = require('mongoose')
var Subject = require('./models/subjects')


var data = [

  {name: 'Physics'},
  {name: 'Geology'},
  {name: 'Golang'},
  {name: 'Ruby'},
  {name: 'DevOps'},
  {name: 'Yoruba'},
  {name: 'English'},
  {name: 'Silicones'},
  {name: 'Blockchain'},
  {name: 'Math'},
  {name: 'Biology'},
]

function loadDB() {

  function clearDB() {
    Subject.remove({}, function(err){
      if(err){
        console.log('something went wrong')
      } else {
        console.log('cleared the subjects db')
      }
    })
  }

  clearDB();

  function reloadDB() {

  data.forEach(function(subject){
    Subject.create(subject, function(err, data){
      if(err){
        console.log('sorry something went wrong' + err)
      } else {
        console.log('Loaded the subjects')
      }
    })
  })
}

reloadDB();

}

module.exports = loadDB;
