var express = require('express');
var router = express.Router();
var validation = require('../src/validation/validation')
var mongoose = require("mongoose");
var AdminUser = mongoose.model('adminUser');


router.get("/get_adminUserList", function(req, res){
    AdminUser.find({}, function(err, adminUsers){
        if(err) return res.json(err);
        res.json({"data":adminUsers})
    })
});

router.post("/get_adminUser", function(req, res){
    AdminUser.find({_id:req.body._id}, function(err, adminUsers){
        if(err) return res.json(err);
        res.json({"data":adminUsers})
    })
});

router.put("/update_adminUser", function(req, res){
    AdminUser.findOneAndUpdate({_id:req.body._id}, req.body.data, function(err, adminUsers){
        if(err) return res.json(err);
        res.sendStatus(200)
    });
});

router.delete("/delete_adminUser", function(req, res){
    AdminUser.remove({_id:req.body._id}, function(err, adminUsers){
        if(err) return res.json(err);
        res.sendStatus(200)
    });
});

/* GET users listing. */
// router.post('/add_adminUser', function(req, res, next) {
//     var valid = validation.validation_add_admin(req.body)
//     if(valid.length>0){
//         res.send(valid);
//     }
//     AdminUser.create(req.body, function(err, contact){
//         if(err) return res.json(err);
//         res.sendStatus(200)
//     });
// });

module.exports = router;
