import { safeParse, flatten } from "valibot";

export const validateParse = (schema, body) => {
  const result = safeParse(schema, body, {
    abortPipeEarly: true,
  });

  let output = {
    success: result.success,
    typed: result.typed,
    data: result.output,
    errors: null,
  };

  if (!result.success) {
    const errors = flatten(result.issues).nested;
    for (const key in errors) {
      if (Array.isArray(errors[key]) && errors[key].length > 0) {
        errors[key] = errors[key][0];
      }
    }
    output.errors = errors;
  }

  return output;
};
