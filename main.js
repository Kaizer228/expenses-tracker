let BudgetDisplay = document.getElementById("BudgetDisplay");
let ExpensesContainer = document.getElementById("ExpensesContainer");
let InputBudget = document.getElementById("InputBudget");
let InputExpenses = document.getElementById("InputExpenses");
let ExpensesDescription = document.getElementById("ExpensesDescription");
let ExpenseForm = document.getElementById("ExpenseForm");

let ParseBudget = 0;
let ParseExpenses = 0;

window.addEventListener("load", function () {
  let RetrievedData = localStorage.getItem("ParseBudgetKey");
  ParseBudget = parseFloat(RetrievedData);
  if (isNaN(ParseBudget) || RetrievedData === null) {
    ParseBudget = "0.00";
    InputBudget.value = ParseBudget;
  }
  InputBudget.value = ParseBudget;
  BudgetDisplay.innerHTML = `₱${parseFloat(ParseBudget).toLocaleString()}`;
});

function AddBudget() {
  let MaxValue = 9999999;

  if (InputBudget.value > MaxValue) {
    alert("Sorry, I can't handle that amount of money.");
    InputBudget.value = "";
    return;
  } else if (InputBudget.value <= 0) {
    alert("Enter a valid budget amount to proceed.");
    InputBudget.value = "";
    return;
  } else {
    ParseBudget = InputBudget.value;
    localStorage.setItem("ParseBudgetKey", ParseBudget);
    BudgetDisplay.innerHTML = `₱${parseFloat(ParseBudget).toLocaleString()}`;
  }
}

ExpenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (InputBudget.value <= 0) {
    alert("Enter a valid budget amount to proceed.");
    InputBudget.value = "";
    return;
  }

  if (InputExpenses.value <= 0) {
    alert("Enter a valid expense amount to proceed.");
    return;
  } else {
    ParseExpenses = parseFloat(InputExpenses.value);

    if (parseFloat(InputExpenses.value) > parseFloat(ParseBudget)) {
      alert("You dont have enough balance.");
      InputExpenses.value = "";
      return;
    } else {
      ParseBudget -= ParseExpenses;

      BudgetDisplay.innerHTML = `₱${parseFloat(ParseBudget).toLocaleString()}`;
      localStorage.setItem("ParseBudgetKey", ParseBudget);

      let h4 = document.createElement("h4");
      let textarea = document.createElement("textarea");

      h4.innerHTML = `Amount of expense is ₱${parseFloat(
        ParseExpenses
      ).toLocaleString()}`;
      textarea.innerHTML = ExpensesDescription.value;

      if (ExpensesDescription.value === "") {
        textarea.style.display = "none";
        ExpensesContainer.appendChild(h4);
      } else {
        ExpensesContainer.appendChild(h4);
        ExpensesContainer.appendChild(textarea);
        textarea.style.display = "";
      }

      ExpensesDescription.value = "";
      InputExpenses.value = "";
      h4.style.backgroundColor = "rgb(0, 0, 255)";
      h4.style.color = "#ffff";
      h4.style.width = "280px";
      h4.style.marginLeft = "60px";
    }
  }
});
