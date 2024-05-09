module.exports = app => {
    const subjects = require("../controllers/subject.controller")
    const subjectRouter = require("express").Router()

    subjectRouter.post('/subjects/add', subjects.create)
    subjectRouter.get('/subjects', subjects.findAll)
    subjectRouter.get('/subjects/name', subjects.findSubjectName)

    app.use('/api', subjectRouter);

}