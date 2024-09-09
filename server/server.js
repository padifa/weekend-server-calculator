const express = require("express");
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("server/public"));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:

// GET /calculations - sends the calculation history back to the client
app.get("/calculations", (req, res) => {
  res.send(calculations); // send the full history of calculations
});

// POST /calculations, receives the new calculations,
//performs the operation and stores the result

app.post("/calculations", (req, res) => {
  const { numOne, numTwo, operator } = req.body;

  //validate that the required fields are present
  if (!numOne || !numTwo || !operator) {
    return res.status(400).send("Required fields");
  }

  //performing the operation

  let result;
  switch (operator) {
    case "+":
      result = Number(numOne) + Number(numTwo);
      break;
    case "-":
      result = Number(numOne) - Number(numTwo);
    case "*":
      result = Number(numOne) * Number(numTwo);
      break;
    case "/":
      result = Number(numOne) / Number(numTwo);
      break;
    default:
      return res.status(400).send("Invalid operator");
  }
  // create a new calculation object
  const newCalculation = {};
  // Send the new calculation to the array calculations
  calculations.push(newCalculation);

  // Send a success status
  res.status(201).send(newCalculation);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === "test") {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
