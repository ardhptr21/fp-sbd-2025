import express from "express";
import session from "express-session";
import path from "path";
import { connectDB } from "./lib/db.js";
import { env } from "./lib/env.js";
import hbs from "./lib/hbs.js";

const app = express();

/**============================================
 *               MIDDLEWARES
 *=============================================**/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(
  session({
    secret: env.app.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  res.locals.flash = req.session.flash || {};
  res.locals.form_errors = req.session.form_errors || {};
  res.locals.form = req.session.form || {};

  delete req.session.flash;
  delete req.session.form_errors;
  delete req.session.form;
  next();
});

/**============================================
 *               SET CONFIGS
 *=============================================**/
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "src", "views"));

/**============================================
 *               ROUTES
 *=============================================**/
import authRoute from "./routes/auth-route.js";
import baseRoute from "./routes/base-route.js";
import cartRoute from "./routes/cart-route.js";
import dashboardRoute from "./routes/dashboard-route.js";
import productRoute from "./routes/product-route.js";
import transactionRoute from "./routes/transaction-route.js";
import checkoutRoute from "./routes/checkout-route.js";

app.use("/", baseRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/dashboard", dashboardRoute);
app.use("/cart", cartRoute);
app.use("/transaction", transactionRoute);
app.use("/checkout", checkoutRoute);

connectDB(() => {
  app.listen(env.app.port, env.app.host, () =>
    console.log(`Server running at ${env.app.host}:${env.app.port}`)
  );
});
