const express = require("express");
const db = require("mysql2");
const app = express();
const cors = require("cors");
//Connection to Database

require("dotenv").config();
const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (!error) {
    console.log("Connected to database");
    return false;
  } else {
    console.log(error);
  }
});
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, result) => {
    res.json({ message: "success", result }).status(200);
  });
});

app.post("/", (req, res) => {
  //Check if name exist in the database
  const { name, occupation, salary } = req.body;

  connection.query(
    "SELECT * FROM users WHERE name = ? AND occupation = ?",
    [name, occupation],
    (err, result) => {
      if (result.length > 0) {
        res
          .status(403)
          .json({ message: "User Already Exist, Try another User" });
        return;
      } else {
        const query = "INSERT INTO users SET?";
        connection.query(query, req.body, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Data stored in the database", result.insertId);
            res.json({ message: "User Stored in the database" });
          }
        });
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.json({ message: "An error occured" });
      console.log(err);
      return;
    } else {
      connection.query("SELECT  * FROM users", (err, result) => {
        console.log(result);
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
