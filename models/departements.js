const mongoose=require('mongoose')
const User=require('./users')
const Course=require('./courses')

const schema=mongoose.Schema
const departements =new schema({//defining the model in mongoose form to use its methods
    name:{type:String,unique:true},
    faculty:{
        type:schema.Types.ObjectId,
        ref: 'Faculties'
    }


})
/*
departements.pre('deleteOne',async function(next){
    await Course.update({departement:{$in:[this.getFilter()["_id"]]}},{$pull:{departement:this.getFilter()["_id"]}})
    await User.update({departement:this.getFilter()["_id"]},{$unset:{departement:1}})

    next();
})
*/


module.exports =  mongoose.model('Departements',departements)//exporting form
;
