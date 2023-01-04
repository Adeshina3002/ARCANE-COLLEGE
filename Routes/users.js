const express = require ('express')
const {usersDB} = require ('../DB') 
const {usersSchemas} = require ('../schemas')
const {mobileNumber} = require ('../functions')

const route = express.Router()

route.post('/api/user/reg', (req, res) => {
   
    const result = usersSchemas(req.body)
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    } 
        const newUser = req.body
        newUser.id = usersDB.length + 1,
        newUser.country = req.body.country,
        newUser.registeredCourse = newUser.courseRegistration.length,
        newUser.phoneNumber = mobileNumber(newUser.country, newUser.mobileNumber)

        delete newUser.mobileNumber

        usersDB.push(newUser)
        console.log(newUser);
        res.status(201).json(newUser)
    
})


route.get('/api/fetch', (req, res) => {
    res.status(200).json(usersDB)
})


route.get('/api/get/:id', (req, res) => {
    
    const found = usersDB.find(user => user.id === parseInt(req.params.id))

    if (!found) {
        return res.status(404).send(`User with ID ${req.params.id} not found`)
    }
    return res.status(200).json(found);

})


route.put ('/api/user/update/:id', (req, res) => {

    const found = usersDB.find(user => user.id === parseInt(req.params.id))

    if (!found) return res.status(404).send(`User with ID ${req.params.id} not found`)

    const result = usersSchemas(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message)

    const updated = req.body 
    updated.id  = found.id
    updated.country = req.body.country,
    updated.registeredCourse = req.body.courseRegistration.length,
    updated.phoneNumber = mobileNumber(updated.country, updated.mobileNumber)

        delete updated.mobileNumber

    const targetIndex = usersDB.indexOf(found)
                    usersDB.splice(targetIndex, 1, updated)

                    res.status(200).json(updated)
})


route.delete('/api/user/del/:id', (req, res) => {
    const found = usersDB.find(user => user.id === parseInt (req.params.id))

    if (! found) return res.status(404).send(`Teacher with ID: ${req.params.id} not found`)

    const targetIndex = usersDB.indexOf(found)
        usersDB.splice(targetIndex, 1)

        res.status(200).end(`Teacher with ID : ${req.params.id} data deleted successfully`)
})



module.exports = route