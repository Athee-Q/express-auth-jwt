var validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { connectDB } = require("../config/connectDB");

const saltRounds = 10;

const validateSignUpData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!validator.isLength(name, { min: 3 })) {
    res.status(400).json({ message: "please Enter the Name" });
    return false;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "please Enter the Valid Email" });
    return false;
  }
  if (
    !validator.isStrongPassword("1234AaBbCcDd", {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    res.status(400).json({ message: "please Enter the Strong Password" });
    return false;
  }
  await connectDB();
  const existinUser = await User.findOne({ email }).exec();
  if (existinUser) {
    res.status(400).json({ message: "Email already Registered" });
    return false;
  }
  return true;
};
module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const isValid = await validateSignUpData(req, res);
  if (isValid) {
    try {
      await connectDB();
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ name, email, password: hashedPassword });
      res.json({
        message: "Account Created Successfully",
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.log(error);
      req.status(400).json({
        message: error,
      });
    }
  }
};
