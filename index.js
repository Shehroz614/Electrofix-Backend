const connectMongo = require("./db");
const express = require("express");
const cors = require("cors")

connectMongo();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/orders", require("./routes/OrdersRoute"));
app.use("/api/skills", require("./routes/SkillsRoute"));

app.listen(5000, () => {
  console.log("Listening at port 5000");
});
