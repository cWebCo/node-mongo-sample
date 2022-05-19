module.exports = app => {

  const auth = require("../config/middleware/auth");

  const companies = require("../controllers/companies.controller.js");

  var router = require("express").Router();

  router.post("/", companies.create);
  router.get("/", companies.finds);
  router.put("/:id", companies.update);
  router.get("/:id", companies.find);
  router.delete("/:id", companies.delete);
  router.delete("/", companies.deleteAll);

  // Without Authentication
  // app.use("/companies", router);

  // For Authentication use like this

  app.use("/companies", auth, router);

};