var autoIncrement = require("mongoose-auto-increment");
const dotenv = require("dotenv");
dotenv.config();
//
const mongoose=require('mongoose')

const User=require('./users')

var connection=mongoose.createConnection('mongodb+srv://team:159753@cluster0.gxsli.mongodb.net/public?retryWrites=true&w=majority',{ useUnifiedTopology: true })
const schema=mongoose.Schema
autoIncrement.initialize(connection);

const requests =new schema({//defining the model in mongoose form to use its methods
    id:{type:Number,unique:true},
    departement:{
        type:schema.Types.ObjectId,
        ref:'Departement'
    },
    type:{
        type:String,
        enum:['Replacement','Slot Linking','Change day off','MLeave','Compensation','SLeave','Annual Leave','ALeave']
    },
    senderId:{
        type: schema.Types.ObjectId,
        ref: 'Users'

    },
    comment:String,
    status:{type:String,enum:['Pending','Accepted','Rejected'],default:"Pending"},
    courseId:{
        type: schema.Types.ObjectId,
        ref: 'Courses'
    },
    reason:String,
    day:{type:String,
        enum:['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday']
    },
    dayToBeReplaced:
        {type:String,
            enum:['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Saturday']
        },
    dayOfTheLeave:Date,
    slot:{type:String,
        enum:['First', 'Second', 'Third', 'Fourth','Fifth']
      },
    location:{
        type: schema.Types.ObjectId,
    ref: 'Locations'
    },
    

})
requests.plugin(autoIncrement.plugin,  { model: 'Requests', field: 'id' });
requests.pre('deleteOne',async function(next){
  
    await mongoose.model('Users').updateMany({notification:{$in:[this.getFilter()["_id"]]}},{$pull:{notification:this.getFilter()["_id"]}})

    next();
})
module.exports =  mongoose.model('Requests',requests)//exporting form
;

