const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
