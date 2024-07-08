const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("../config/connectDB");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB(); // Ensure database connection

    const dbUser = await User.findOne({ email }).exec();

    if (!dbUser) {
      return res.status(400).json({ message: "Email not registered. Please sign up." });
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
      // Create JWT token
      const token = jwt.sign(
        {
          id: dbUser._id,
          email: dbUser.email,
        },
        process.env.JWT_LOGIN_TOKEN,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        token,
      });
    } else {
      return res.status(400).json({ message: "Username or password incorrect." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
