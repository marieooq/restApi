const express = require("express");
const Joi = require("joi");
const app = express(); //create express application on the app variable
app.use(express.json()); //used the json file

//Give the data to the server
let customers = [
  { title: "George", id: 1 },
  { title: "Emily", id: 2 },
  { title: "Bob", id: 3 },
  { title: "Ann", id: 4 }
];

//read request handler
app.get("/", (req, res) => {
  res.send("Welcome to the REST API DEMO.");
});

//display the list of customers when the URL consists of api and customers
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

//create new customer information
app.post("/api/customers", (req, res) => {
  const customer = {
    id: customers.length + 1,
    title: req.body.title
  };

  customers.push(customer);
  res.send(customer);
});

//display the list of a specific customer when you mention the id
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) res.status(404).send("<h2>Sorry, cannot find that id.</h2>");
  res.send(customer);
});

//update existing customer information
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  console.log(`inside put customer: ${customer.title}`);
  customer.title = req.body.title;
  res.send(customer);
});

//delete existing customer information
app.delete("/api/customers/:id", (req, res) => {
  console.log("delete");
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  console.log(`inside delete cutomer: ${customer}`);
  const index = customers.indexOf(customer);

  customers.splice(index, 1);
  res.send(customer);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}.`));
