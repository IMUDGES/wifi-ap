let mongoose=require('./../mognoose')

let test_schema=new mongoose.Schema({

})

let test=mongoose.model('test',test_schema)

module.exports=test