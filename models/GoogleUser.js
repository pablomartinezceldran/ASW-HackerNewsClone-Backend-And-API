const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedsubmissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "submissions",
      default: null,
    },
  ],
});

module.exports = mongoose.model("GoogleUser", UserSchema);
