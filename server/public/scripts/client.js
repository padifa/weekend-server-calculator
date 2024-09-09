console.log("client.js is sourced!");

let selectedOperator = ""; // Global variable to track the selected operator

onReady();

function onReady() {
  // Attach event listeners to all operator buttons
  document.querySelectorAll("button[data-operator]").forEach((button) => {
    button.addEventListener("click", handleOperator);
  });

  // Attach event listener to form submission
  document
    .querySelector('form[data-testid="calculator"]')
    .addEventListener("submit", addCalculation);
}

// Function to handle operator selection
function handleOperator(event) {
  selectedOperator = event.target.getAttribute("data-operator");
  console.log("Selected operator:", selectedOperator);
}

function addCalculation(event) {
  event.preventDefault();

  const numOne = document.getElementById("numOne").value;
  const numTwo = document.getElementById("numTwo").value;

  // Ensure operator is selected before submitting
  if (!selectedOperator) {
    alert("Please select an operator.");
    return;
  }

  const newCalculation = {
    numOne,
    numTwo,
    operator: selectedOperator,
  };

  console.log("Sending calculation to server:", newCalculation);

  // Send the calculation to the server
  axios({
    method: "POST",
    url: "/calculations",
    data: newCalculation,
  })
    .then((response) => {
      console.log("Calculation added successfully:", response.data);

      // Refresh the calculation history and recent result
      fetchCalculation();

      // Clear the inputs and reset the operator
      document.getElementById("numOne").value = "";
      document.getElementById("numTwo").value = "";
      selectedOperator = ""; // Reset the operator
    })
    .catch((err) => console.error("Error making calculation:", err));
}

function fetchCalculation() {
  // Fetch the calculations from the server
  axios({
    method: "GET",
    url: "/calculations",
  })
    .then((response) => {
      const calculations = response.data;
      console.log("Received calculations from the server:", calculations);

      // Updating the most recent result
      const recentResultSection = document.getElementById("recentResult");
      const recentCalculation = calculations[calculations.length - 1];
      if (recentCalculation) {
        recentResultSection.innerHTML = `
          Most Recent Result: ${recentCalculation.numOne} 
          ${recentCalculation.operator} ${recentCalculation.numTwo} = ${recentCalculation.result}`;
      }

      // Updating the history of results
      const resultHistorySection = document.getElementById("resultHistory");
      const historyList = resultHistorySection.querySelector("ul");
      resultHistorySection.innerHTML = ""; // Clear existing history

      calculations.forEach((calc) => {
        const historyContent = document.createElement("p");
        historyContent.textContent = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
        resultHistorySection.appendChild(historyContent);
      });
    })
    .catch((error) => {
      console.error("Error fetching calculations:", error);
    });
}

// Created a function to clear input fields and reset the operator
function clearInputs() {
  document.getElementById("numOne").value = "";
  document.getElementById("numTwo").value = "";
  selectedOperator = "";
  console.log("Inputs cleared");
}
onReady();
