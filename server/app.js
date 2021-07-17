require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");

const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client", "dist")));
app.use(helmet());
app.use(morgan("dev"));
app.use(fileUpload());

const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`server is running on port: ${port}`);
});
