console.log("client.js is sourced!");

onReady();

function onReady() {
  fetchCalculation();
}

function addCalculation(event) {
  event.preventDefault();
  const numOne = document.getElementById("numOne").value;
  const numTwo = document.getElementById("numTwo").value;

  let newCalculation = {
    numOne,
    numTwo,
  };
  console.log("add calculation", newCalculation);

  axios({
    method: "POST",
    url: "/calculations",
    data: newCalculation,
  })
    .then((response) => {
      fetchCalculation();

      document.getElementById("numOne").value = "";
      document.getElementById("numTwo").value = "";
    })
    .catch((err) => console.error(`Error making calculation`, err));
}
function fetchCalculation(event) {
  event.preventDefault();
  num++;

  axios({
    method: "GET",
    url: "/calculations",
    data: {
      numOne: document.getElementById("numOne").value,
      numTwo: document.getElementById("numTwo").value,
    },
  })
    .then(function (response) {
      console.log(`we received calculations from the server`, response);
    })
    .catch(err);
}
