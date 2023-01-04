const express = require ('express')

const usersRoute = require ('./Routes/users')

const teachersRoute = require ('./Routes/Teachers')

require ('dotenv').config()

const morgan = require ('morgan')

// const Joi = require ('joi')

const PORT = process.env.PORT || 5500

const app = express()

app.use (morgan('dev')) 

app.use (express.json())

app.use(express.urlencoded({extended: false}))

app.get ('/', (req, res, next) => {
    res.status(200).send("Welcome to Arcane school project")
    next ()
})

app.use('/users', usersRoute)
app.use('/teachers',teachersRoute)

app.get ('*', (req, res) => {
    res.status(400).send("Unknown URL or URL not found")
})


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})

