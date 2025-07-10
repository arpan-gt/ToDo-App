import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.post("/add", (req, res) => {
  res.send("add new task");
});

app.get("/mytasks", (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
