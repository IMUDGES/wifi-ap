let express = require('express'),
    router = express.Router(),
    console = require('tracer').console(),
    fs = require('fs'),
    multer = require('multer'),
    upload=multer({ dest: './uploads/' }),
    saveService=require('./../libs/services/saveService')


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'})
})
router.post('/upload',upload.single('data'), (req, res,next) => {
    "use strict";
    let fileName=req.file.filename
    saveService.saveData(fileName,(error,result)=>{
      if (error){
          res.send({
              status:false,
              msg:error.message
          })
      }
      else {
          res.send({
              status:true,
              msg:'save data success'
          })
      }
    })
})


module.exports = router;
