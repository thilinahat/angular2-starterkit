var express = require('express');
var router = express.Router();

const persons = [{name:"name1",id:"id1"}
                ,{name:"name2",id:"id2"}
                ,{name:"name3",id:"id3"}
                ,{name:"name4",id:"id4"}];

router.get('/', function (req, res, next) {
    res.send('API PAGE');
});


router.get('/persons', function (req, res, next) {
    res.json(persons);
});
module.exports = router;