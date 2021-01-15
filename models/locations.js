const mongoose=require('mongoose')
const schema=mongoose.Schema
const locations =new schema({//defining the model in mongoose form to use its methods
    name:{type:String,unique:true},
    type:{type:String,enum:['tutorial rooms', 'lecture halls','offices']},
    currentCapacity:Number,
    maxCapacity:Number,
})

module.exports =  mongoose.model('Locations',locations)//exporting form
;
