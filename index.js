/* Your Code Here */

//createRecordEmployee: receives an array of info about an employee
//the function should return an object with the details of the employee
//


const employeeArray = ['Jane', 'Doe', 'Engineer', 54]

let createEmployeeRecord =  function(employeeArray){

    return{
        firstName:employeeArray[0],
        familyName:employeeArray[1],
        title:employeeArray[2],
        payPerHour:employeeArray[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}
let createEmployeeRecords = function(employeeData){
    return employeeData.map(function(employeeArray){
       return createEmployeeRecord (employeeArray)
    })
}
//create time in event

let createTimeInEvent = function(dateStamp){

    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
    //this points to the current object in execution

}

//create time out event
let createTimeOutEvent = function(dateStamp){

    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
    //this points to the current object in execution

}

//hours worked

let hoursWorkedOnDate = function (dateStamp){

    let inEvent = this.timeInEvents.find(e => e.date === dateStamp)
    let outEvent = this.timeOutEvents.find(e => e.date === dateStamp)

    return (outEvent.hour - inEvent.hour)/100

}

console.log(createEmployeeRecord(employeeArray))

let wagesEarnedOnDate = function(dateStamp){

    let rawWage = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour

    return parseFloat(rawWage.toString())
}


const allWagesFor = function () {
    //getting an array for all worked dates for the employee
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    //reduce is used to sum up wages for each date
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//
let findEmployeeByFirstName =  function (srcArray, firstName){
    return srcArray.find(rec =>rec.firstName === firstName)
}

let calculatePayroll = function(arrayEmpl){

    return arrayEmpl.reduce((memo, rec)=>{
        return memo + allWagesFor.call(rec)
    },0)
}
