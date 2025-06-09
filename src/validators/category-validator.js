import * as v from "valibot";

export const categoryCreateValidator = v.object({
  name: v.pipe(v.string(), v.nonEmpty(), v.minLength(3), v.maxLength(25), v.trim()),
  description: v.pipe(v.string(), v.nonEmpty(), v.minLength(20), v.maxLength(500), v.trim()),
});
