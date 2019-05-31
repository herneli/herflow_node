import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import OAuthServer from "express-oauth-server";
import OAuthModel from "./auth/OAuthModel";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import organizationsRouter from "./routes/organization";
import entitiesRouter from "./routes/entity";
import contactsRouter from "./routes/contact";
import workflowsRouter from "./routes/workflow";
import debugModule from "debug";
import cors from "cors";
import passport from "./auth/passport";
const debug = debugModule("test:server");

var app = express();

// Manage oauth
app.oauth = new OAuthServer({
  model: new OAuthModel(),
  requireClientAuthentication: { password: false }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let auth = passport.authenticate("jwt", { session: false });

app.use("/", indexRouter);
app.use("/api/workflows", workflowsRouter);
app.use("/api/organizations", organizationsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/entities", entitiesRouter);
app.use("/api/users", userRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/oauth/token", app.oauth.token());

// Enter the secure area
//app.use("/api", app.oauth.authenticate(), apiRouter);
// Get secret.

app.get("/secret", auth, function(req, res) {
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
