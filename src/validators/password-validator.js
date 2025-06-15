import * as v from "valibot";

export const passwordUpdateValidator = v.object({
    old_password: v.pipe(
        v.string(),
        v.nonEmpty("Password lama wajib diisi"),
        v.minLength(6, "Password lama minimal 6 karakter"),
        v.trim()
    ),
    new_password: v.pipe(
        v.string(),
        v.nonEmpty("Password baru wajib diisi"),
        v.minLength(6, "Password baru minimal 6 karakter"),
        v.trim()
    )
});
  