function getData(){
    let userName = document.getElementById("userName").value;
    let rollNumber = document.getElementById("rollNumber").value
    console.log(userName, rollNumber)
    // alert("Function Run")

    // let abc = "value";
    // abc = "new values"

    
    // document.getElementById("result").innerHTML = "<p>" + userName + "(" + rollNumber + ")" + "</p>";


    document.getElementById("result").innerHTML = `<p>${userName} <span>(${rollNumber})</span></p>`;


    // console.log(resultElement);
}







// let
// var
// const

// var firstVariable = "45";
// firstVariable = "newValue"
// var firstVariable = "65"

// let secondVariable = "assign value";
// secondVariable = "New Value"

// const thirdVariable = "Assigned Value";