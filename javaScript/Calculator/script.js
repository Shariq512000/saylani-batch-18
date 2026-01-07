function calculate(){
    let firstNum = Number(document.getElementById("firstNum").value);
    let secondNum = Number(document.getElementById("secondNum").value);
    let operator = document.getElementById("operator").value;
    let result = "";
    if(operator == "Addition"){
        result = firstNum + secondNum
    }else if(operator == "Subtraction"){
        result = firstNum - secondNum
    }else if(operator == "Multiplication"){
        result = firstNum * secondNum
    }else if(operator == "Division"){
        result = firstNum / secondNum
    }else{
        alert("Please Select Operator")
    }

    document.getElementById("result").innerHTML = `<p>The ${operator} of ${firstNum} and ${secondNum} is ${result}</p>`
}