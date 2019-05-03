//services
const express = require('express');
const app = express();
 const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
 const bodyParser = require('body-parser');
 const db_url = "mongodb://localhost:27017/botdb";
var route=express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use('/',route);


// route.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html');
// })
route.get('/details',(req,res)=>{
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected");
        dbo.collection("test").find().toArray((err,result)=>{
            if (err)
            console.log(err);
            else
            res.json(result);
        });          
    });
})
route.post('/details/add', (req, res) => {
   
    var details = {
        first_name: req.body.first_name,
        password: req.body.password
      };
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected"); 
        dbo.collection("test").insertOne(details,(err,result)=>{
            if (err)
            console.log(err);
            else
            res.json(result);
        });         
    });
  })
route.put('/details/:id', (req, res) => {
    var obj=req.body;
    let id =  ObjectId(req.params.id);
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected");   
        dbo.collection("test").updateOne({"_id":id},{$set:{"first_name":obj.first_name}},(err,result)=>{
            if (err)
            console.log(err);
            else
            res.json(result);
        });       
    });
  })
route.delete('/details/:id', (req, res) => {
    let id =  ObjectId(req.params.id);
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected"); 
        dbo.collection("test").deleteOne({"_id":id},(err,result)=>{
            if (err)
            console.log(err);
            else
            res.json(result);
        });       
    });
  })

  app.listen(8000,()=>{ console.log("connected");});
 