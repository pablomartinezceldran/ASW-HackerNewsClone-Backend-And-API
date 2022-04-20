const mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    likedsubmissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "submissions",
        default: null,
      },
    ],

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
