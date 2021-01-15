const mongoose=require('mongoose')
const Departement=require('./departements')
const User=require('./users')


const schema=mongoose.Schema
const faculties =new schema({//defining the model in mongoose form to use its methods
    name:{type:String,unique:true},


})

faculties.pre('deleteOne',async function(next){
    var depar=await Departement.updateMany({faculty:this.getFilter()["_id"]},{$unset:{faculty:1}})
   
    var users=await User.updateMany({faculty:this.getFilter()["_id"]},{$unset:{faculty:1}})
 
    next();
})

module.exports =  mongoose.model('Faculties',faculties)//exporting form
;
