const express = require ('express')
const bcrypt = require ('bcryptjs')
const { mobileNumber, isEntitledToBonus } = require('../functions')
const {teachersDB} = require ('../DB')
const {teachersSchemas} = require ('../Schemas')

const route = express.Router()

route.post ('/api/login', async (req, res) => {

    const {email, password} = req.body 

    const user = teachersDB.find (u => u.email === email)

    if (!user) return res.status(404).send(`${user.email} does not exist, please try again`)

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) return res.status(404).send("Incorrect password, please try again")

    return res.status(200).send(`Welcome ${user.firstName} ${user.lastName}`)
})

route.post('/api/signup', async (req, res) => {
    
    const result = teachersSchemas(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message)

    const newTeacher = req.body
    newTeacher.id = teachersDB.length + 1
    newTeacher.password = req.body.password 
    newTeacher.phoneNumber = mobileNumber(newTeacher.country, newTeacher.mobileNumber)

    delete newTeacher.mobileNumber

    newTeacher.entitledToBonus = isEntitledToBonus(req.body.courseInCharge)

        const hash = await bcrypt.hash(req.body.password, 10)

        newTeacher.password = hash

        teachersDB.push(newTeacher)
        console.log(newTeacher)
        res.status(201).json(newTeacher)
})


route.get('/api/data', (req, res) => {
    res.status(200).json(teachersDB)
})


route.get('/api/data/:id', (req, res) => {
    const found = teachersDB.find (teacher => teacher.id === parseInt(req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID : ${req.params.id} not found`)

    return res.status(200).json(found)
})


route.put('/api/update/:id', (req, res) => {

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

route.delete('/api/delete/:id', (req, res) => {

    const found = teachersDB.find(teacher => teacher.id === parseInt (req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID: ${req.params.id} not found`)

    const targetIndex = teachersDB.indexOf(found)
        teachersDB.splice(targetIndex, 1)

        return res.status(200).send(`Teacher with ID : ${req.params.id} data deleted successfully`)
})


module.exports = route