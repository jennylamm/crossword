const express = require("express");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const app = express();
app.use(express.json()); // Ensure body parsing

const csvWriter = createCsvWriter({
  path: "./data.csv",
  header: [
    { id: "gamePin", title: "gamePin" },
    { id: "grid", title: "grid" },
    { id: "across", title:"across" }, 
    { id: "down", title: "down"}
  ],
  append: true,
});

app.post("/write-to-csv", (req, res) => {
  const newData = req.body;
  console.log(newData)
  csvWriter
    .writeRecords([newData])
    .then(() => res.status(200).send("CSV file updated successfully"))
    .catch((err) => {
      res.status(500).send("Error writing to CSV");
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
