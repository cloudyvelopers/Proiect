const express = require('express')

const router = express.Router()

const studentsController = require('../controllers/StudentsController.js')

router.get('/students', studentsController.findAll)
router.get('/students/:id', studentsController.findOne)