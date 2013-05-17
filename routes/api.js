/*
 * Serve JSON to our AngularJS client
 */
mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;


var server = new Server('localhost',27017,{auto_reconnect: true})
var db = new Db('fieldtracker',server);


db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'fieldtracker' database");
    db.collection('records', {strict:false}, function(err, collection) {
      if (err) {
        console.log("The 'records' collection doesn't exist.");
      }
    });
  }
});

exports.findall = function(req, res) {
  db.collection('records', function(err, collection) {
    collection.find().sort({name:1}).toArray(function(err, items) {
      res.send(items);
    });
  });
};


exports.updaterecord = function(req, res) {

  var name = req.params.name;
  var week = req.params.week;
  var status = req.params.status;


  db.collection('records',function(err,collection){
    collection.findOne({"name" : name},function(err,document) {
      document.history[week] = status;
      collection.save(document);
      res.send(document);
    });
  });
};

exports.savepage = function(req,res) {
  var new_page = req.params.pagenum;
  var o_id = new BSON.ObjectID("518255f38c6a585c9a0e0d4f");
  db.collection('memory',function(err,collection){
    collection.findOne({"_id" : o_id},function(err,document) {
      document.page = new_page;
      collection.save(document);
      res.send(document);
    });
  });
}

exports.getpage = function(req,res) {
  var new_page = req.params.pagenum;
  var o_id = new BSON.ObjectID("518255f38c6a585c9a0e0d4f");
  db.collection('memory',function(err,collection){
    collection.findOne({"_id" : o_id},function(err,document) {
      res.send(document);
    });
  });
}
