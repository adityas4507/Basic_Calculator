let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let history = [];

/* Add value to display */
function append(value) {
  display.value += value;
}

/* Clear display */
function clearDisplay() {
  display.value = "";
}

/* Calculate and save history */
function calculate() {
  try {
    let expression = display.value;
    let result = eval(expression.replace(/%/g, "/100"));

    let record = expression + " = " + result;
    history.push(record);
    addToHistory(record);

    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* Add to history UI */
function addToHistory(record) {
  if (!historyList) return;
  let li = document.createElement("li");
  li.textContent = record;
  historyList.prepend(li);
}

/* Clear history */
function clearHistory() {
  history = [];
  if (historyList) historyList.innerHTML = "";
}

/* =========================
   KEYBOARD SUPPORT
   ========================= */

document.addEventListener("keydown", function (event) {
  let key = event.key;

  // Numbers
  if (!isNaN(key)) {
    append(key);
  }

  // Operators
  else if (["+", "-", "*", "/"].includes(key)) {
    append(key);
  }

  // Decimal
  else if (key === ".") {
    append(".");
  }

  // Percentage
  else if (key === "%") {
    append("%");
  }

  // Enter or =
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  }

  // Backspace
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Clear
  else if (key === "Escape" || key === "Delete" || key.toLowerCase() === "c") {
    clearDisplay();
  }
});
