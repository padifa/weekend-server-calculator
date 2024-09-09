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
  document.getElementById("resultHistory").innerHTML = `
  Result History: ${numOne}, ${numTwo}
  `;

  axios({
    method: "POST",
    url: "/calculations",
    data: {
      numOne: document.getElementById("numOne").value,
      numTwo: document.getElementById("numTwo").value,
    },
  })
    .then(function (response) {
      console.log(`we received calculations from the server`, response);
    })
    .catch(function (error) {
      console.log(error);
      alert(`There is something wrong`);
    });

  axios({
    method: "GET",
    url: "/calculations/calculate",
  }).then(function (response) {
    console.log(response);
    const resultObj = response.data;
    const resultTable = document.getElementById("resultHistory");

    resultTable.innerHTML += `
    <tr>
    <td>numOne</td>
     <td>numTwo</td>
    </tr>
    <tr>
     <td>${resultObj.numOne}</td>
      <td>${resultObj.numTwo}</td>
    </tr>
    `;
    clear();
  });

  function clear() {
    axios({
      method: "GET",
      url: "/calculations",
    })
      .then(function (response) {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error, "error clearing the numbers");
      });
  }
}
onReady();
