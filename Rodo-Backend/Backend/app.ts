import express, { NextFunction, Request, Response } from "express";
const cors = require("cors");

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var searchRouter = require("./routes/search");
var getModelRouter = require("./routes/getModels");
var getMakes = require("./routes/getMakes");
var getYears = require("./routes/getYears");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/search", searchRouter);
app.use("/getModels", getModelRouter);
app.use("/getMakes", getMakes);
app.use("/getYears", getYears);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
