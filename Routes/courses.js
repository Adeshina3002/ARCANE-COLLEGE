const express = require ('express')

const { coursesDB, teachersDB, usersDB } = require('../DB')
const {numberOfRegisteredStudents, names} = require ('../Functions')
const {checkCourse} = require ('../Schemas')



const courseCheck = "Phy 301" // checkCourse(req.body)  // checkCourse is a schema function

// if (courseCheck.error) {
//     return res.status(400).send(courseCheck.error.details[0].message)
// }





// names(teachersDB, courseCheck, usersDB)
names (teachersDB, courseCheck)

// numberOfRegisteredStudents(coursesDB, courseCheck)

module.exports = {courseCheck}


