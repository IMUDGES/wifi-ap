let mongoose=require('./../mognoose')

let test_schema=new mongoose.Schema({
    name:{
        type:String
    }
})

let test=mongoose.model('test',test_schema)

module.exports=test