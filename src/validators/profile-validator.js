import * as v from "valibot";

export const profileUpdateValidator = v.object({
  full_name: v.pipe(
    v.string(),
    v.nonEmpty("Nama wajib diisi"),
    v.minLength(3, "Nama minimal 3 karakter"),
    v.maxLength(100, "Nama maksimal 100 karakter"),
    v.trim()
  ),
  date_of_birth: v.pipe(
    v.string(),
    v.nonEmpty("Tanggal lahir wajib diisi"),
    v.transform((str) => {
      const date = new Date(str);
      if (isNaN(date.getTime())) throw new Error("Tanggal lahir tidak valid");
      return date;
    })
  ),
  address: v.pipe(
    v.string(),
    v.nonEmpty("Alamat wajib diisi"),
    v.minLength(5, "Alamat minimal 5 karakter"),
    v.maxLength(200, "Alamat maksimal 200 karakter"),
    v.trim()
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Nomor telepon wajib diisi"),
    v.trim(),
    v.regex(/^(\+62|0)[0-9]{9,13}$/, "Nomor telepon tidak valid")
  ),
  gender: v.pipe(
    v.string(),
    v.nonEmpty("Jenis kelamin wajib diisi"),
    v.enum_(["male", "female"], "Jenis kelamin tidak valid")
  )
});
