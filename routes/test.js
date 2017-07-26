let express = require('express')
let test_service=require('./../libs/services/test-service')
let router = express.Router()

/* GET home page. */
router.post('/',(req,res,next)=>{
    let data=req.body
    //console.log(req.body)
    test_service.save(data,(error)=>{
        //异常处理
        if(error){
            res.send({
                status:false,
                msg:error.message
            })
        }
        else {
            res.send({
                status:true,
                msg:'保存信息成功'
            })
        }
    })
})

module.exports = router
