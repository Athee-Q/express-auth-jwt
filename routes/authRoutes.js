const express = require("express");
const routes = express.Router();
const signUp = require('../controllers/signup.controller')
const login = require('../controllers/login.controller')
const auth = require('../controllers/auth.controller')

routes.post("/signup", signUp);
routes.post("/login", login);
routes.get("/auth", auth);

module.exports = routes;
