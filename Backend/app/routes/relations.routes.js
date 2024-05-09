module.exports = (app) => {
  const relations = require("../controllers/relations.controller");
  const relationRouter = require("express").Router();

  relationRouter.get("/user/relations/id", relations.findUserRelations);

  relationRouter.get("/user/subjects/id", relations.findUserSubject);

  relationRouter.delete("/user/relations/id", relations.delete);

  relationRouter.post("/user/relations", relations.create);

  app.use("/api", relationRouter);
};
