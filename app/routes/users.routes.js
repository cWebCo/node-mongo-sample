module.exports = app => {
  const auth = require("../controllers/users.controller");

  var router = require("express").Router();

  router.post("/", auth.loginAuth);

  router.post("/register", auth.createAuth);
  
  router.post("/access-token", auth.accessToken);

  router.post("/refresh-token", auth.refreshToken);

  app.use("/users", router);
};