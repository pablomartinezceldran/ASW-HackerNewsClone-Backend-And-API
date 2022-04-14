
const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
},
{
    timestamps:true,
    versionKey:false
}
);

module.exports= mongoose.model("User", userSchema);