var value1 = 0;
var value2 = 0;
var preValue = 0;
var operator = "";
var currentValue = "num1";
var displayCount;
var prevInput = "";
var prevCount;
var result = "";
var displayValue = "";
var operatorSymbol = "";
var negativeStatus = "";

const element = document.getElementById("num");
const calculatorBtn = document.querySelector(".calculator-btn");
const calculatorBtnIcon = document.querySelector(".calculator-btn .fa-solid");
const inputContainer = document.querySelector(".input-container");

calculatorBtn.addEventListener("click", openCalculator);
inputContainer.addEventListener("click", closeCalculator);

function click() {
  const key = this.id;
  const keyStyle = this.name;

  buttonAnimation(keyStyle);
  calculator(key);
}

function keyListener(event) {
  event.target.blur();
  const key = event.key;
  let keyStyle = document.getElementById(key);
  console.log(key);
  keyStyle = keyStyle.name;
  buttonAnimation(keyStyle);
  calculator(key);
}

function openCalculator() {
  const calculator = document.querySelector(".calculator");
  if (calculator.classList.contains("display")) {
    closeCalculator();
    return;
  }
  calculator.classList.add("display");
  calculatorBtn.classList.add("open");
  calculatorBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  const buttonNumbers = document.querySelectorAll(".btn-calc").length;
  for (let i = 0; i < buttonNumbers; i++) {
    document.querySelectorAll(".btn-calc")[i].addEventListener("click", click);
  }
  document.addEventListener("keydown", keyListener);
}

function closeCalculator() {
  const calculator = document.querySelector(".calculator");
  calculator.classList.remove("display");
  calculatorBtn.classList.remove("open");
  calculatorBtn.innerHTML = `<i class="fa-solid fa-calculator"></i>`;
  const buttonNumbers = document.querySelectorAll(".btn-calc").length;
  for (let i = 0; i < buttonNumbers; i++) {
    document
      .querySelectorAll(".btn-calc")
      [i].removeEventListener("click", click);
  }
  document.removeEventListener("keydown", keyListener);
}

function buttonAnimation(keyButton) {
  var activeButton = document.querySelector("." + keyButton);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 150);
}

function calculator(key) {
  switch (key) {
    case "Escape":
      if (!value1) {
        value2 = "";
        element.innerHTML = 0;
        preValue = 0;
        prevInput = "";
        currentValue = "num1";
        operator = "";
        document.getElementById("count").style.height = "none";
        negativeStatus = false;
        closeCalculator();
        return;
      }
      value1 = "";
      value2 = "";
      preValue = 0;
      operator = "";
      currentValue = "num1";
      displayCount = "";
      prevInput = "";
      prevCount = "";
      result = "";
      displayValue = "";
      element.innerHTML = 0;
      document.getElementById("count").style.display = "none";
      element.style.fontSize = "38.5px";
      negativeStatus = false;
      break;
    case "Backspace":
      console.log("teste");
      if (element.innerHTML.length === 1) {
        element.innerHTML = "0";
        prevInput = "";
        currentValue === "num1" ? (value1 = "") : (value2 = "");
        return;
      }
      var innnerHTML = element.innerHTML;
      var slicedValue = innnerHTML.slice(0, innnerHTML.length - 1);
      innnerHTML.length < 16 ? (element.style.fontSize = "21.7px") : null;
      innnerHTML.length < 13 ? (element.style.fontSize = "27px") : null;
      innnerHTML.length < 11 ? (element.style.fontSize = "38.5px") : null;
      prevInput = slicedValue;
      currentValue === "num1"
        ? (value1 = parseFloat(slicedValue))
        : (value2 = parseFloat(slicedValue));
      element.innerHTML = slicedValue;
      break;
    case "0":
      var input = 0;
      getValues(input);
      break;
    case "1":
      if (result) {
        calculator("Escape");
      }
      var input = 1;
      getValues(input);
      break;
    case "2":
      if (result) {
        calculator("Escape");
      }
      var input = 2;
      getValues(input);
      break;
    case "3":
      if (result) {
        calculator("Escape");
      }
      var input = 3;
      getValues(input);
      break;
    case "4":
      if (result) {
        calculator("Escape");
      }
      var input = 4;
      getValues(input);
      break;
    case "5":
      if (result) {
        calculator("Escape");
      }
      var input = 5;
      getValues(input);
      break;
    case "6":
      if (result) {
        calculator("Escape");
      }
      var input = 6;
      getValues(input);
      break;
    case "7":
      if (result) {
        calculator("Escape");
      }
      var input = 7;
      getValues(input);
      break;
    case "8":
      if (result) {
        calculator("Escape");
      }
      var input = 8;
      getValues(input);
      break;
    case "9":
      if (result) {
        calculator("Escape");
      }
      var input = 9;
      getValues(input);
      break;
    case ".":
      if (result) {
        calculator("Escape");
      }
      input = ".";
      value2 === 0 ? (value2 = "") : null;
      currentValue === "num1"
        ? (value1 = value1.toString())
        : (value2 = value2.toString());
      const regex = /[.]/g;
      let checkedNum = currentValue === "num1" ? value1 : value2;
      const foundComa =
        currentValue === "num1" ? value1.match(regex) : value2.match(regex);

      if (!foundComa) {
        getValues(input, currentValue);
        if (checkedNum.length === 0 || parseInt(checkedNum.charAt(0)) === 0) {
          element.innerHTML = "0.";
          prevInput = element.innerHTML;
          displayValue = element.innerHTML;
          numComa === "num1"
            ? (value1 = element.innerHTML)
            : (value2 = element.innerHTML);
          return;
        }
      }
      if (foundComa) {
        return;
      }
      break;
    case "plusOrMinus":
      const integer = parseFloat(element.innerHTML);
      if (integer > 0) {
        element.innerHTML = -Number(integer);
        if (result) {
          value1 = parseFloat(element.innerHTML);
          return;
        }
        negativeStatus = true;
      } else if (integer < 0) {
        element.innerHTML = integer * -1;
        if (result) {
          value1 = parseFloat(element.innerHTML);
          return;
        }
        negativeStatus = false;
        return;
      }

      break;
    case "%":
      let percentValue = Math.abs((value2 / 100) * value1);
      value2 = percentValue;
      result = calculate(value1, value2, operator);
      value1 = result;
      result = result.toString();
      displayResult(result);
      preValue = percentValue;
      value2 = "";
      break;
    case "/":
      if (value2) {
        result = calculate(value1, value2, operator);
        value1 = result;
        result = result.toString();
        displayResult(result);
        preValue = value2;
      }
      if (negativeStatus) {
        currentValue === "num1"
          ? (value1 = parseFloat(element.innerHTML))
          : (value2 = parseFloat(element.innerHTML));
      }
      negativeStatus = false;
      operator = "division";
      operatorSymbol = "/";
      displayCount = value1.toString();
      count = `${displayCount.substring(0, 14)} /`;
      document.getElementById("count").innerHTML = count;
      document.getElementById("count").style.display = "block";
      currentValue = "num2";
      preValue = value2;
      displayValue = "";
      prevInput = "";
      result = "";

      break;
    case "*":
      if (value2) {
        result = calculate(value1, value2, operator);
        value1 = result;
        result = result.toString();
        displayResult(result);
        preValue = value2;
      }
      if (negativeStatus) {
        currentValue === "num1"
          ? (value1 = parseFloat(element.innerHTML))
          : (value2 = parseFloat(element.innerHTML));
      }
      negativeStatus = false;
      operator = "multiply";
      operatorSymbol = "*";
      !value1 ? (value1 = 0) : null;
      !value2 ? (value2 = 0) : null;
      displayCount = value1.toString();
      count = `${displayCount.substring(0, 14)} x`;
      document.getElementById("count").innerHTML = count;
      document.getElementById("count").style.display = "block";
      currentValue = "num2";
      displayValue = "";
      prevInput = "";
      result = "";
      break;
    case "-":
      if (value2) {
        result = calculate(value1, value2, operator);
        value1 = result;
        result = result.toString();
        displayResult(result);
        preValue = value2;
      }
      if (negativeStatus) {
        currentValue === "num1"
          ? (value1 = parseFloat(element.innerHTML))
          : (value2 = parseFloat(element.innerHTML));
      }
      negativeStatus = false;
      operator = "subtract";
      operatorSymbol = "-";
      displayCount = value1.toString();
      count = `${displayCount.substring(0, 14)} -`;
      document.getElementById("count").innerHTML = count;
      document.getElementById("count").style.display = "block";
      currentValue = "num2";
      displayValue = "";
      prevInput = "";
      result = "";
      break;
    case "+":
      if (value2) {
        result = calculate(value1, value2, operator);
        value1 = result;
        result = result.toString();
        displayResult(result);
        preValue = value2;
      }
      if (negativeStatus) {
        currentValue === "num1"
          ? (value1 = parseFloat(element.innerHTML))
          : (value2 = parseFloat(element.innerHTML));
      }
      negativeStatus = false;
      operator = "addition";
      operatorSymbol = "+";
      displayCount = value1.toString();
      count = `${displayCount.substring(0, 14)} +`;
      document.getElementById("count").innerHTML = count;
      document.getElementById("count").style.display = "block";
      currentValue = "num2";
      displayValue = "";
      prevInput = "";
      result = "";
      break;
    case "Enter":
      if (negativeStatus) {
        value2 = parseFloat(element.innerHTML);
      }
      if (!value1 && !value2 && !operator) {
        return;
      }
      if (value1 && !operator) {
        result = value1.toString();
        displayResult(result);
        return;
      } else if (!value2) {
        value2 = preValue;
        result = calculate(value1, value2, operator);
      }
      result = calculate(value1, value2, operator);
      result = Math.round(result * 100) / 100;
      let showResult = result.toString();
      displayCount = value2.toString();
      displayResult(showResult);
      preValue = value2;
      value1 = result;
      value2 = "";
      negativeStatus = false;
      break;
  }
}

function getValues(input) {
  console.log(prevInput > 0);
  if ((displayValue.length >= 1 && displayValue === "0.") || prevInput > 0) {
    let numValue = "" + prevInput + input;
    numValue.length > 11 ? (element.style.fontSize = "33px") : null;
    numValue.length > 13 ? (element.style.fontSize = "27px") : null;
    numValue.length > 16 ? (element.style.fontSize = "21.7px") : null;
    if (negativeStatus) {
      element.innerHTML = "-" + numValue.substring(0, 20);
    } else {
      element.innerHTML = numValue.substring(0, 20);
    }
    prevInput = numValue;
    currentValue === "num1"
      ? (value1 = parseFloat(numValue))
      : (value2 = parseFloat(numValue));

    return;
  }
  currentValue === "num1" ? (value1 = input) : (value2 = input);
  prevInput = input;
  element.innerHTML = input;
  displayValue = element.innerHTML;
}

function displayResult(resultValue) {
  let showResult = resultValue;
  showResult.length < 16 ? (element.style.fontSize = "21.7px") : null;
  showResult.length < 13 ? (element.style.fontSize = "27px") : null;
  showResult.length < 11 ? (element.style.fontSize = "38.5px") : null;
  showResult.length > 11 ? (element.style.fontSize = "33px") : null;
  showResult.length > 13 ? (element.style.fontSize = "27px") : null;
  showResult.length > 16 ? (element.style.fontSize = "21.7px") : null;
  element.innerHTML =
    showResult === "NaN" ? "ERROR" : showResult.substring(0, 20);

  if (showResult && !value2) {
    document.getElementById("count").innerHTML = `${showResult.substring(
      0,
      14
    )} =`;
    document.getElementById("count").style.display = "block";
    return;
  }

  let displayCount1 = value1.toString();
  count = `${displayCount1.substring(0, 14)} ${operatorSymbol}`;
  document.getElementById(
    "count"
  ).innerHTML = `${count} ${displayCount.substring(0, 14)} =`;
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case "division":
      return num1 / num2;
    case "multiply":
      return num1 * num2;
    case "subtract":
      return num1 - num2;
    case "addition":
      return num1 + num2;
  }
}
