var express = require('express');
var router = express.Router();
var validation = require('../src/validation/validation')
var mongoose = require("mongoose");
var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/footstepadmin');
var adminUserSchema = mongoose.Schema({
    id : {type:String, required:true, unique:true},
    name : {type:String, required:true},
    email : {type:String, required:true},
    grade : {type:String, required:true},
    password :{type:String, required:true}
});

var AdminUser = mongoose.model("adminUser", adminUserSchema);

db.once("open", function(){
  console.log("DB connected");
});
// 4
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

router.get("/get_adminUserList", function(req, res){
    AdminUser.find({}, function(err, adminUsers){
        if(err) return res.json(err);
        res.json({"data":adminUsers})
    })
});

router.post("/get_adminUser", function(req, res){
    AdminUser.find({id:req.body.id}, function(err, adminUsers){
        if(err) return res.json(err);
        res.json({"data":adminUsers})
    })
});

router.put("/update_adminUser", function(req, res){
    AdminUser.findOneAndUpdate({id:req.body.uid}, req.body.data, function(err, adminUsers){
        if(err) return res.json(err);
        res.sendStatus(200)
    });
});

router.delete("/delete_adminUser", function(req, res){
    AdminUser.remove({id:req.body.id}, function(err, adminUsers){
        if(err) return res.json(err);
        res.sendStatus(200)
    });
});

/* GET users listing. */
router.post('/add_adminUser', function(req, res, next) {
    var valid = validation.validation_add_admin(req.body)
    if(valid.length>0){
        res.send(valid);
    }
    AdminUser.create(req.body, function(err, contact){
        if(err) return res.json(err);
        res.sendStatus(200)
    });
});

module.exports = router;
