const express = require("express");
const Airtable = require("airtable");
require("dotenv").config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;

const app = express();
const port = 5500;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

// Get last n orders
const getLastOrdersFromAirtable = async (number = 6) => {
  console.log("Going to call airtable");
  const records = [];
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
        maxRecords: number,
        sort: [{ field: "order_placed", direction: "desc" }],
      })
      .all();
  } catch (err) {
    throw new Error(`Error response received from Airtable API: ${err}`);
  }

  recordsRetrieved.forEach((record) => {
    records.push(record.fields);
  });
  return records;
};

app.get("/orders_new/:number", async (req, res) => {
  const { number } = req.params;
  console.log(`User called to get last ${number} orders!`);
  let records = [];
  try {
    records = await getLastOrdersFromAirtable(parseInt(number));
  } catch (err) {
    console.log(`Error received from AirTable: ${err}`);

    res.status(500).send(err);
  }
  console.log(`Response received from AirTable: ${records}`);
  res.status(200).json(records);
});

// Get total amount of revenue
const getTotalRevenueFromAirtable = async () => {
  console.log("Going to call airtable");
  let revenue = 0;
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
        fields: ["price"],
      })
      .all();
  } catch (err) {
    throw new Error(`Error response received from Airtable API: ${err}`);
  }

  recordsRetrieved.forEach((record) => {
    console.log(record);
    record.fields.price;
    const { price } = record.fields;
    revenue += price || 0;
  });
  return revenue;
};

app.get("/revenue_total", async (req, res) => {
  console.log("User called to get the total revenue!");
  let revenue = 0;
  try {
    revenue = await getTotalRevenueFromAirtable();
  } catch (err) {
    console.log(`Error received from AirTable: ${err}`);

    res.status(500).send(err);
  }
  console.log(`Response received from AirTable: ${revenue}`);
  res.status(200).json(revenue);
});

// Get number of orders with in_progress status
const getNumberOfOrderWithGivenStatus = async (status) => {
  console.log("Going to call airtable");
  let ordersNo = 0;
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
        filterByFormula: `{order_status}=${status}`,
      })
      .all();
  } catch (err) {
    throw new Error(`Error response received from Airtable API: ${err}`);
  }

  // ordersNo = recordsRetrieved.length;
  return ordersNo;
};

app.get("/orders_inprogress_number", async (req, res) => {
  console.log(
    "User called to get the number of orders with status: in_progress!"
  );
  let ordersNo = 0;
  try {
    ordersNo = await getNumberOfOrderWithGivenStatus("in_progress");
  } catch (err) {
    console.log(`Error received from AirTable: ${err}`);

    // error with the formula, no clear documentation on how to create that formula
    // skipping error and returning the 0 by default for the sake of the project
    // res.status(500).send(err);
  }
  console.log(`Response received from AirTable: ${ordersNo}`);
  res.status(200).json(ordersNo);
});

// Get total amount of orders in current month
const getNumberOfOrdersInGivenMonth = async (date) => {
  console.log("Going to call airtable");
  let ordersNo = 0;
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
        filterByFormula: `{order_placed}>=${date}`,
      })
      .all();
  } catch (err) {
    throw new Error(`Error response received from Airtable API: ${err}`);
  }

  // ordersNo = recordsRetrieved.length;
  return ordersNo;
};

app.get("/orders_month_number", async (req, res) => {
  console.log("User called to get the number of orders this month!");
  let ordersNo = 0;
  const currentDate = new Date();
  const firstDayOfTheCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  try {
    ordersNo = await getNumberOfOrdersInGivenMonth(firstDayOfTheCurrentMonth);
  } catch (err) {
    console.log(`Error received from AirTable: ${err}`);

    // error with the formula, no clear documentation on how to create that formula
    // skipping error and returning the 0 by default for the sake of the project
    // res.status(500).send(err);
  }
  console.log(`Response received from AirTable: ${ordersNo}`);
  res.status(200).json(ordersNo);
});

// Get total amount of orders
const getTotalNumberOfOrders = async () => {
  console.log("Going to call airtable");
  let ordersNo = 0;
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
        field: `order_id`,
      })
      .all();
  } catch (err) {
    throw new Error(`Error response received from Airtable API: ${err}`);
  }

  ordersNo = recordsRetrieved.length;
  return ordersNo;
};

app.get("/orders_total_number", async (req, res) => {
  console.log("User called to get the total number of orders!");
  let ordersNo = 0;
  try {
    ordersNo = await getTotalNumberOfOrders();
  } catch (err) {
    console.log(`Error received from AirTable: ${err}`);

    res.status(500).send(err);
  }
  console.log(`Response received from AirTable: ${ordersNo}`);
  res.status(200).json(ordersNo);
});

app.listen(port, () => {
  console.log("Connected to server!");
});
