module.exports = (app) => {
  const relations = require("../controllers/relations.controller")
  const relationRouter = require("express").Router()
  const authMiddleware = require("../config/authMiddleware.config")

  relationRouter.get("/user/relations/id", authMiddleware, relations.findUserRelations)

  relationRouter.get("/user/subjects/id", authMiddleware, relations.findUserSubject)

  relationRouter.delete("/user/relations/id", authMiddleware, relations.delete)

  relationRouter.post("/user/relations", authMiddleware, relations.create)

  relationRouter.get("/user/subjects/id_subject", authMiddleware, relations.findNumberOfStudents)

  app.use("/api", relationRouter)
}
