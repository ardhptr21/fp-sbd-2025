import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { env } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

/**============================================
 *               MIDDLEWARES
 *=============================================**/
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(process.cwd(), "public")));

/**============================================
 *               SET CONFIGS
 *=============================================**/
app.engine(".hbs", engine({ extname: "hbs", defaultLayout: false }));
app.set("view engine", ".hbs");
app.set("views", path.join(process.cwd(), "src", "views"));

/**============================================
 *               ROUTES
 *=============================================**/
app.get("/", (req, res) => {
  return res.render("home");
});

connectDB(() => {
  app.listen(env.app.port, env.app.host, () =>
    console.log(`Server running at ${env.app.host}:${env.app.port}`)
  );
});
