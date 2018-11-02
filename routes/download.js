var express = require("express");
var router = express.Router();
var archiver = require('archiver');
var {join} =require('path');

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log(req.query.filePath);
  if(!req.query.filePath){
    res.status(500).send({ error: '文件名错误啦' });
  }
  const filePath = req.query.filePath;
  const filePathMain = join(__dirname,`../.cache/${filePath}/whaleApp/`)
    
  var archive = archiver("zip");
  archive.on("error", function(err) {
    res.status(500).send({ error: err.message });
  });

  //on stream closed we can end the request
  archive.on("end", function() {
    console.log("Archive wrote %d bytes", archive.pointer());
  });

  //set the archive name
  res.attachment("whaleApp.zip");

  //this is the streaming magic
  archive.pipe(res);

  var directories = [filePathMain];

  for (var i in directories) {
    archive.directory(
      directories[i],directories[i].replace(filePathMain, 'whaleApp')
    );
  }

  archive.finalize();
});

module.exports = router;
