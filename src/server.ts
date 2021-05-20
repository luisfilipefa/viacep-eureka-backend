import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(3333, () => {
  console.log("listening on 3333");
});
