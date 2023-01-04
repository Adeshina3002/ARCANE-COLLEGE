const express = require ('express')
const { mobileNumber } = require('../functions')
const {teachersDB} = require ('../DB')

// const Joi = require ('joi')

const {teachersSchemas} = require ('../Schemas')

const route = express.Router()

route.post('/api/teacher/reg', (req, res) => {
    

    const result = teachersSchemas.validate(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message)

    const newTeacher = req.body
    newTeacher.id = "T" + teachersDB.length + 1
    newTeacher.phoneNumber = mobileNumber(newTeacher.country, newTeacher.mobileNumber)

    delete newTeacher.mobileNumber

    newTeacher.entitledToBonus;
        if (req.body.courseInCharge.length >= 4) {
            newTeacher.entitledToBonus = true
        } else {
            newTeacher.entitledToBonus = false 
        }

        teachersDB.push(newTeacher)
        res.status(201).json(newTeacher)
})


route.get('/api/fetch', (req, res) => {
    res.status(200).json(teachersDB)
})


route.get('/api/teacher/:id', (req, res) => {
    const found = teachersDB.find (teacher => teacher.id === parseInt(req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID : ${req.params.id} not found`)

    return res.status(200).json(found)
})


route.put('/api/teacher/update/:id', (req, res) => {

    const found = teachersDB.find(teacher => teacher.id === parseInt (req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID : ${req.params.id} not found`)

    const result = teachersSchemas.validate(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message)

    const updatedData = req.body
    updatedData.id = found.id,
    updatedData.phoneNumber = mobileNumber(updatedData.country, updatedData.mobileNumber)

    delete updatedData.mobileNumber

    const targetIndex = users.indexOf(found)
                    users.splice(targetIndex, 1, updatedData)

                    res.status(200).json(updatedData)   

})

route.delete('/api/teacher/del/:id', (req, res) => {

    const found = teachersDB.find(teacher => teacher.id === parseInt (req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID: ${req.params.id} not found`)

    const targetIndex = teachersDB.indexOf(found)
        teachersDB.splice(targetIndex, 1)

        return res.status(200).send(`Teacher with ID : ${req.params.id} data deleted successfully`)
})


module.exports = route