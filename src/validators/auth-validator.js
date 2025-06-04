import * as v from "valibot";

export const loginValidator = v.object({
  credential: v.pipe(v.string(), v.nonEmpty(), v.minLength(3), v.trim()),
  password: v.pipe(v.string(), v.nonEmpty(), v.trim()),
});
