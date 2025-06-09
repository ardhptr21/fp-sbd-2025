import { create } from "express-handlebars";

const hbs = create({
  extname: "hbs",
  defaultLayout: false,
  helpers: {
    eq: (a, b) => a === b,

    get: (obj, key) => {
      if (typeof obj === "object" && obj !== null && key in obj) {
        return obj[key];
      }
      return undefined;
    },
  },
});

export default hbs;
