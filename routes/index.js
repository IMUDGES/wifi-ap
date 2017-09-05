let express = require('express'),
    router = express.Router(),
    console = require('tracer').console(),
    fs = require('fs'),
    multer = require('multer'),
    uploadApData=require('./../libs/utils/uploadApData'),
    uploadMap=require('./../libs/utils/uploadMap'),
    saveService=require('./../libs/services/saveService')


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'})
})
router.post('/uploads',uploadApData.single('data'), (req, res,next) => {
    "use strict";
    let fileName=req.file.filename
    //console.log(fileName)
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
router.post('/uploadMap',uploadMap.single('map'),(req,res)=>{
    "use strict";
    console.log(req.file.filename)
    res.send({data:'11'})
})


module.exports = router;
