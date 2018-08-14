import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import OAuthServer from "express-oauth-server";
import OAuthModel from "./oauth2/OAuthModel";
import indexRouter from "./routes/index";
import apiRouter from "./routes/api";
import debugModule from "debug";

const debug = debugModule("test:server");

var app = express();

app.oauth = new OAuthServer({
  model: new OAuthModel(), // See https://github.com/oauthjs/node-oauth2-server for specification
  requireClientAuthentication: { password: false }
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/oauth/token", app.oauth.token());

// Enter the secure area
//app.use("/api", app.oauth.authenticate(), apiRouter);
// Get secret.
app.get("/secret", app.oauth.authenticate(), function(req, res) {
  // Will require a valid access_token.
  res.send("Secret area");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;
export default app;
