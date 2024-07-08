const { default: mongoose } = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the Email"],
      unique: true,
      validate: [isEmail, "Please Enter the valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter the Password"],
      minLength: [8, "Minimum password length is 8"],
      validate: [isStrongPassword],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
