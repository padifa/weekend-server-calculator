console.log("client.js is sourced!");

onReady();

function onReady() {
  // Attached event listeners to all buttons and the form submission
  document
    .querySelector('form[data-testid="calculator"]')
    .addEventListener("submit", addCalculation);
  document.querySelectorAll("button[data-operator]").forEach((button) => {
    button.addEventListener("click", handleOperator);
  });
}

function addCalculation(event) {
  event.preventDefault();
  const numOne = document.getElementById("numOne").value;
  const numTwo = document.getElementById("numTwo").value;

  // Mke sure operator is selected before submitting
  if (!selectedOperator) {
    alert("please select an operator.");
    return;
  }

  let newCalculation = {
    numOne,
    numTwo,
    operator: selectedOperator,
  };
  console.log("Sending calculation to server:", newCalculation);
  axios({
    method: "POST",
    url: "/calculations",
    data: newCalculation,
  })
    .then((response) => {
      console.log("Calculation added successfully:", response.data);
      fetchCalculation(); //Refresh the calculation history and recent result

      //Clear the inputs and reset the operator
      document.getElementById("numOne").value = "";
      document.getElementById("numTwo").value = "";
      selectedOperator = "";
    })
    .catch((err) => console.error(`Error making calculation`, err));
}
function fetchCalculation() {
  axios({
    method: "GET",
    url: "/calculations",
  }).then(function (response) {
    console.log("Received calculations from the server:", response.data);
    const calculations = response.data;
  });

  //Updating the most recent result
  const recentResultSection = document.querySelector(
    'section[data-testid="recentResult"]'
  );
  const recentCalculation = calculations[calculations.length - 1];
  if (recentCalculation) {
    recentResultSection.textContent = `Most Recent Result: ${recentCalculation.numOne} 
    ${recentCalculation.operator} ${recentCalculation.numTwo} = ${recentCalculation.result}`;
  }
}
