
const User = require("./users");
const Departement = require("./departements");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const courses = new schema({
  //defining the model in mongoose form to use its methods
  name: String,
  id: { type: String, unique: true },
  departement: [
    {
      type: schema.Types.ObjectId,
      ref: "Departements",
    },
  ],
  teachingSlots: Number,
  coverage: Number,
  fullyCovered: Boolean,
  slots:[{     
    day:  {type:String,
        enum:['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
    },
    slot:{type:String,
        enum:['First', 'Second', 'Third', 'Fourth','Fifth']
    },
    location:{
        type: schema.Types.ObjectId,
    ref: 'Locations'
    },
    available:Boolean
}],
});
module.exports = mongoose.model("Courses", courses); //exporting form
courses.pre("deleteOne", async function (next) {
  await User.update(
    { courses: { $in: [this.getFilter()["_id"]] } },
    { $pull: { courses: this.getFilter()["_id"] } }
  );
  await User.update(
    { coursesCoordinated: { $in: [this.getFilter()["_id"]] } },
    { $pull: { coursesCoordinated: this.getFilter()["_id"] } }
  );
  next();
});
