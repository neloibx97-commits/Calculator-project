const buttons = document.querySelectorAll("#btns button");
const display = document.querySelector(".result h1");

let firstNumber = null;
let operator = null;
let currentInput = "";
let justCalculated = false;

//  Display function
function adjustFontSize() {
  let length = display.textContent.length;

  if (length > 10) {
    display.style.fontSize = "20px";
  } else if (length > 10) {
    display.style.fontSize = "28px";
  } else {
    display.style.fontSize = "33px";
  }
}

function updateDisplay() {
  if (firstNumber !== null && operator !== null) {
    display.textContent = firstNumber + " " + operator + " " + currentInput;
  } else {
    display.textContent = currentInput || "0";
  }

  adjustFontSize();
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let value = button.innerHTML;

    switch (value) {
      case "AC":
        firstNumber = null;
        operator = null;
        currentInput = "";
        updateDisplay();
        break;

      case "Del":
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
        break;

      case "±":
        if (currentInput !== "") {
          currentInput = (Number(currentInput) * -1).toString();
        }
        updateDisplay();
        break;

      case "√":
      case "&radic;":
        if (currentInput !== "") {
          currentInput = Math.sqrt(Number(currentInput)).toString();
        }
        updateDisplay();
        break;

      case "x²":
      case "x&sup2;":
        if (currentInput !== "") {
          currentInput = Math.pow(Number(currentInput), 2).toString();
        }
        updateDisplay();
        break;

      case "abs":
      case "|x|":
        if (currentInput !== "") {
          currentInput = Math.abs(Number(currentInput)).toString();
        }
        updateDisplay();
        break;

      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        if (currentInput !== "") {
          firstNumber = Number(currentInput);
          operator = value;
          currentInput = "";
        }
        updateDisplay();
        break;

      case "=":
        if (firstNumber !== null && operator !== null && currentInput !== "") {
          let secondNumber = Number(currentInput);
          let result;

          switch (operator) {
            case "+":
              result = firstNumber + secondNumber;
              break;
            case "-":
              result = firstNumber - secondNumber;
              break;
            case "*":
              result = firstNumber * secondNumber;
              break;
            case "/":
              result =
                secondNumber === 0 ? "Error" : firstNumber / secondNumber;
              break;
            case "%":
              result = (firstNumber * secondNumber) / 100;
              break;
          }

          firstNumber = null;
          operator = null;
          currentInput = result.toString();
          justCalculated = true; // 🔥 IMPORTANT
        }
        updateDisplay();
        break;

      default:
        // If we just finished a calculation,
        // start fresh when a number is pressed
        if (justCalculated) {
          currentInput = value;
          justCalculated = false;
        } else {
          currentInput += value;
        }

        updateDisplay();
    }
  });
});
