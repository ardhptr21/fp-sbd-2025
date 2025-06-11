import * as v from "valibot";

export const productCreateValidator = v.object({
  name: v.pipe(v.string(), v.nonEmpty(), v.minLength(3), v.maxLength(50), v.trim()),
  description: v.pipe(v.string(), v.nonEmpty(), v.minLength(20), v.maxLength(500), v.trim()),
  price: v.pipe(v.unknown(), v.nonEmpty(), v.transform(Number), v.minValue(0)),
  stock: v.pipe(v.unknown(), v.nonEmpty(), v.transform(Number), v.minValue(0)),
  image: v.pipe(v.string(), v.nonEmpty(), v.trim(), v.url()),
  category: v.pipe(v.string(), v.nonEmpty(), v.trim()),
});
