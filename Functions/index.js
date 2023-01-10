const {usersDB, teachersDB, coursesDB} = require ('../DB')

const {courseCheck} = require ('../Schemas')

// Check if a teacher is entitled to bonus

const isEntitledToBonus = (input) => {
    if (input.length >= 4) return true 

    return false
}

// validate phone number

mobileNumber = (country, mobile)=> {
    if (country === "Nigeria" || newUser.country === "NG") {
        let numToArray = [...mobile];
        let number;
        if(numToArray[0] == 0) {
            numToArray.splice(0, 1)
        // console.log("number.join", numToArray.join(''));   
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


const numberOfRegisteredStudents = ((input1, courseCheck) => {
        
    input1.map((courses) => {            //checking through the courseDB
        
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


// const names = (input, courseCheck, users) => {
// input.find(x => {
//     for (let i = 0; i < x.courseInCharge.length; i++) {
//     if (x.courseInCharge[i] === courseCheck) {
//         console.log("OKAAAAAY");

//         // let name = `${users.firstName} ${users.lastName}`
//         // let id = users.id
//         // let email = users.email
    
//     // console.log({id,name});
//         // users.map(x => {
//         //         for (let i = 0; i < x.courseRegistration.length; i++) {
//         //             if (x.courseRegistration[i] === courseCheck) {

//         //                 let studentName = name;
//         //                 let studentEmail = email;
//         //                 let studentID = id
//         //                 console.log([{studentName, studentEmail, studentID}]);
//         //                 return ([{studentName, studentEmail, studentID}])
                        
//         //             }
//         //         } 
//         // })
//         for (user of users) {
//             console.log({
                
//             });
//         }
//     }
//     }
// })
// }

const names = (input, courseCheck) => {
   input.find (x => x.courseIncharge)
}






    module.exports = {
        mobileNumber,
        registeredStudents,
        names,
        numberOfRegisteredStudents,
        isEntitledToBonus
    }