module.exports = app => {
    const subjects = require("../controllers/subject.controller")
    const subjectRouter = require("express").Router()
    const authMiddleware = require("../config/authMiddleware.config")

    subjectRouter.post('/subjects/add', authMiddleware, subjects.create)
    subjectRouter.get('/subjects', authMiddleware, subjects.findAll)
    subjectRouter.get('/subjects/name', authMiddleware, subjects.findSubjectName)
    subjectRouter.get('/subjects/teacher', authMiddleware, subjects.findAllByTeacher)

    app.use('/api', subjectRouter);

}