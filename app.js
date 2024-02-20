const express = require("express");
const app = express();
const cors = require("cors");

//import dotenv
const dotenv = require("dotenv").config();

//check enviroment
if (dotenv.error) {
  throw new Error(`Enviroment Variables - import error | ${dotenv.error}`);
}

//variable .env
const port = process.env.PORT;

//import sequilize
const sequelize = require("./database/database.js");

//Imports Routes
const productRoutes = require("./routes/product.route.js");
const expenseRoutes = require("./routes/expense.route.js");
const sellRoutes = require("./routes/sell.route.js");

//Imports modules
require("./models/Product.js");
require("./models/Expense.js");
require("./models/Sell.js");

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api", productRoutes);
app.use("/api", expenseRoutes);
app.use("/api", sellRoutes);

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`The application is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error when starting connection", error);
  }
}

main();
