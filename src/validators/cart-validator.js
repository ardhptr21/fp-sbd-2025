import * as v from "valibot";

export const addToCartValidator = v.object({
  product: v.pipe(v.string(), v.nonEmpty()),
  quantity: v.pipe(v.unknown(), v.transform(Number), v.number(), v.minValue(1)),
});
