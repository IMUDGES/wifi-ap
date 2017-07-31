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
router.post('/',(req,res)=>{
    res.json({data:'sdsd'})
})
router.post('/upload',upload.single('data'), (req, res,next) => {
    "use strict";
    let fileName=req.file.filename
    saveService.save(fileName,(error,result)=>{
      if (error){
          res.json({
              status:false,
              msg:error.message
          })
      }
      else {
          res.json({
              status:true,
              msg:'save data success'
          })
      }
    })
})


module.exports = router;
