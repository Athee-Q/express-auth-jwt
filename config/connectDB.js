const { default: mongoose } = require("mongoose")
require("dotenv").config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connectd Successfully!");
    } catch (error) {
        console.log('Unable to connect Database dueto: ', error);
    }
}