
let display = document.getElementById("display");
let currentInput = "";

function appendNumber(number) {
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (/[+\-*/]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    if (key === "/" || key === "*" || key === "-" || key === "+") {
      appendOperator(key);
    } else {
      appendNumber(key);
    }
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
