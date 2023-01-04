const {usersDB, teachersDB, coursesDB} = require ('../DB')
const {courseCheck} = require ('../Functions')

// validate phone number

mobileNumber = (country, mobile)=> {
    if (country === "Nigeria" || newUser.country === "NG") {
        let numToArray = [...mobile];
        let number;
        if(numToArray[0] == 0) {
            numToArray.splice(0, 1)
        console.log("number.join", numToArray.join(''));   
        return (`+234` + numToArray.join("")) 

    }  else if (numToArray.slice(0,3) === 2,3,4 && numToArray.length === 13) {
        return (`+` + numToArray.join(""))
}
    }}


    // This function is to count the number of registered students for a particular course in the usersDB

let count = 0;
// let checkCourse = "Mth 305" //checkCourse has been replaced with courseCheck to accept input from the client through the Joi schema
const registeredStudents = (input) => {
    input.filter (function (course) {

        for (let i = 0; i < course.courseRegistration.length; i++) {
            if (course.courseRegistration[i] === courseCheck) {
                count++
                
            }
        } 
    })
    
}
// registeredStudents(usersDB)
// console.log(count);


const numberOfRegisteredStudents = ((input) => {
        
    input.map((courses) => {            //checking through the courseDB
        
        if (courses.courseCode  === courseCheck) {
            // console.log("courses courseCode :",courses.courseCode);
            // counter ++
            
            // console.log (`${courses.courseCode} : ${courses.courseTitle}`)
            registeredStudents(usersDB)
            console.log(`Number of registered students for ${courses.courseCode}, \"${courses.courseTitle}\" is : ${count}`)
            
            return
        } 
    })
})


const names = (input, users) => {
input.map(x => {
    for (let i = 0; i < x.courseInCharge.length; i++) {
    if (x.courseInCharge[i] === courseCheck) {

        let name = `${x.firstName} ${x.lastName}`
        let id = x.id
    
    console.log({id,name});
        users.map(x => {
                for (let i = 0; i < x.courseRegistration.length; i++) {
                    if (x.courseRegistration[i] === courseCheck) {

                        let studentName = `${x.firstName} ${x.lastName}`;
                        let studentEmail = x.email;
                        let studentID = x.id
                        console.log([{studentName, studentEmail, studentID}]);

                        
                    }
                } 
        })
    }
    }
})
}






    module.exports = {
        mobileNumber,
        registeredStudents,
        names,
        numberOfRegisteredStudents
    }