let cities = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Hydrabad", "Larkana"]

function checkCity(){
    let userCity = document.getElementById("cityName").value // QUETTA

    let isCityMatched = false;

    for(let i = 0; i < cities.length; i++){
        if(userCity.toLowerCase() == cities[i].toLowerCase()){
            isCityMatched = true
            break;
        }
    }

    // console.log("isCityMatched", isCityMatched)
    if(isCityMatched){
        alert("City Matched")
    }else{
        alert("City Did Not Matched")
    }
}

// let myName = "ShAriQ";

// console.log(myName.toLowerCase())

// console.log(myName)

{/* <h1 id='result'>Hello <span>World</span></h1> */}

// innerHTML ==> Hello <span>World</span>
// innerText ==> Hello World

// "abc" != "Abc"