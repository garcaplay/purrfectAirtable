const express = require("express");
const Airtable = require("airtable");
require("dotenv").config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;

const app = express();
const port = 5500;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

const getOrdersFromAirtable = async () => {
  console.log("going to call airtable");
  const records = [];
  let recordsRetrieved = [];
  try {
    recordsRetrieved = await base("Orders")
      .select({
        view: "Grid view",
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

app.get("/api/orders", async (req, res) => {
  console.log("User called to get orders!");
  let records = [];
  try {
    records = await getOrdersFromAirtable();
  } catch (err) {
    res.status(500).send(err);
  }
  console.log("Response received from AirTable");
  console.log(records);
  res.status(200).send(records);
});

app.listen(port, () => {
  console.log("Connected to server!");
});
