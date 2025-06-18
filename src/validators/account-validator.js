import * as v from "valibot";

export const accountUpdateValidator = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty("Username wajib diisi"),
    v.minLength(3, "Username minimal 3 karakter"),
    v.maxLength(30, "Username maksimal 30 karakter"),
    v.trim()
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Email wajib diisi"),
    v.email("Email tidak valid"),
    v.trim()
  ),
});

export const passwordUpdateValidator = v.object({
  old_password: v.pipe(
    v.string(),
    v.nonEmpty("Password wajib diisi"),
    v.minLength(6, "Password minimal 6 karakter"),
    v.trim()
  ),
  new_password: v.pipe(
    v.string(),
    v.nonEmpty("Password wajib diisi"),
    v.minLength(6, "Password minimal 6 karakter"),
    v.trim()
  ),
});
