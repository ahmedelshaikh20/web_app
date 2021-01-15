var autoIncrement = require("mongoose-auto-increment");

const mongoose = require("mongoose");
var connection = mongoose.createConnection(
  "mongodb+srv://team:159753@cluster0.gxsli.mongodb.net/public?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const schema = mongoose.Schema;
autoIncrement.initialize(connection);

const attendance = new schema({
  //defining the model in mongoose form to use its methods
  id: { type: Number, unique: true },
  user: { type: schema.Types.ObjectId, ref: "Users" },
  signIn: {
    month: String,
    day: String,
    hour: String,
  },
  signOut: {
    month: String,
    day: String,
    hour: String,
  },
  totalHours: Number,
  date: Date,
});
attendance.plugin(autoIncrement.plugin, { model: "Attendance", field: "id" });

module.exports = mongoose.model("Attendance", attendance);
//exporting form
