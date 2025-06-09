import * as v from "valibot";

export const loginValidator = v.object({
  credential: v.pipe(v.string(), v.nonEmpty(), v.minLength(3), v.trim()),
  password: v.pipe(v.string(), v.nonEmpty(), v.trim()),
});

export const registerValidator = v.object({
  name: v.pipe(v.string(), v.nonEmpty(), v.minLength(3), v.trim()),
  email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.trim()),
  password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6), v.trim()),
  phone: v.pipe(v.string(), v.nonEmpty(), v.minLength(10), v.trim()),
});
