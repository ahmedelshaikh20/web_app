const Requests=require('./requests')
const Departement=require('./departements')
const Attendance=require('./attendance')

const mongoose=require('mongoose')
const schema=mongoose.Schema
const users =new schema({//defining the model in mongoose form to use its methods
    email:{type: String, unique : true, required : true},
    password:{type: String, unique : false, default:123456},
    id:{type: String, unique : true },
    name:String,
    salary:Number,
    userType:{
        type:String,
        enum:['TA', 'DR', 'CC', 'HR','HOD']
    },
    faculty:{
        type: schema.Types.ObjectId,
        ref: 'Faculties'
    },
    departement:{
        type: schema.Types.ObjectId,
        ref: 'Departements'
    },
    courses:[{
        type: schema.Types.ObjectId,
        ref: 'Courses'
    }],
    coursesCoordinated:[{
        type: schema.Types.ObjectId,
        ref: 'Courses'
    }],
    officeLocation:{
        type: schema.Types.ObjectId,
        ref: 'Locations'
    },
    new:{type:Boolean,default:true},
    personalDetails:String,
    schedule:[{
        day:  {type:String,
            enum:['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
        },
        slot:{type:String,
            enum:['First', 'Second', 'Third', 'Fourth','Fifth']
        },
        course:{
            type: schema.Types.ObjectId,
            ref: 'Courses'
        },
        location:{

            type: schema.Types.ObjectId,
        ref: 'Locations'
        },
        type:{
            type:String,
            enum:['Normal','Replacement']
        }
    }],//json object contains type of slot
    daysOff:[
        {type:String,
        enum:['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
    }
],
    annualLeaves:{type:Number,default:2.5},
    missingHours:Number,
    missingDays:Number,
    extraHours:Number,
    notification:Array,
    accidentalLeaves:{type:Number,default:6},
    gender:{type:String,enum:['m','f']},
//     coursesInstructed:[{
//         type: schema.Types.ObjectId,
//         ref: 'Courses'
//     }],
    
})
users.pre('deleteOne',async function(next){

    await mongoose.model('Departements').updateMany({headId:this.getFilter()["_id"]},{$unset : { headId : 1}})
    
    await Requests.deleteMany({senderId:this.getFilter()["_id"]})

    await Attendance.deleteMany({user:this.getFilter()["_id"]})

    
    next();
})

module.exports =  mongoose.model('Users',users)//exporting form
;
