let localStrVal = localStorage.getItem("users") // 2 // null

let users = [] // 2 []

if(localStrVal){
    users = JSON.parse(localStrVal)
}

function registerUser(){
    let userName = document.getElementById("userName").value
    let userEmail = document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value

    for(let i = 0; i < users.length; i++){
        if(users[i].email == userEmail){
            alert("Already Register Account on this Email")
            return;
        }
    }

    let userObj = {
        name: userName,
        email: userEmail,
        password: userPassword
    }
    users.push(userObj)

    let convertUserToStr = JSON.stringify(users)

    localStorage.setItem("users", convertUserToStr)
}