import dayjs from "dayjs";
import "dayjs/locale/id.js";
import { create } from "express-handlebars";

dayjs.locale("id");

const hbs = create({
  extname: "hbs",
  defaultLayout: false,
  helpers: {
    mul: (a, b) => a * b,

    or: (a, b) => a || b,
    and: (a, b) => a && b,
    not: (value) => !value,

    ternary: (condition, trueValue, falseValue) => (condition ? trueValue : falseValue),
    eq: (a, b) => {
      if (typeof a === "object" && typeof b === "object") {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      return a === b;
    },

    get: (obj, key) => {
      if (typeof obj === "object" && obj !== null && key in obj) {
        return obj[key];
      }
      return undefined;
    },

    formatDate: (value, formatOrOptions) => {
      if (!value) return "";
      const defaultFormat = "DD MMMM YYYY, HH:mm";
      const format = typeof formatOrOptions === "string" ? formatOrOptions : defaultFormat;
      return dayjs(value).format(format);
    },
  },
});

export default hbs;
