import express from "express";
import { validateParse } from "../lib/validator.js";
import {
  checkCategoryExists,
  createCategory,
  getCategories,
  getCategoriesForSelect,
  getCategoryBySlug,
  updateCategory,
} from "../repositories/category-repo.js";
import {
  createProduct,
  getProductById,
  getProductByIdWithCategory,
  getProducts,
  updateProduct,
} from "../repositories/product-repo.js";
import { categoryCreateValidator } from "../validators/category-validator.js";
import { productCreateValidator } from "../validators/product-validator.js";
import { profileUpdateValidator } from "../validators/profile-validator.js";
import { accountUpdateValidator } from "../validators/account-validator.js";
import {
  getProfileByUser,
  checkIfProfileExistsByPhone,
  updateProfileByUser,
} from "../repositories/profile-repo.js";
import { Profile } from "../models/profile-model.js";
import { checkIfUserExistsByCreds, getUserById, updateUser } from "../repositories/user-repo.js";

/**----------------------
 *    PROFILE
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardProfile = async (req, res) => {
  const profile = await getProfileByUser(req.session.user._id);
  return res.render("pages/dashboard/profile", {
    profile,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardProfileUpdate = async (req, res) => {
  const { user } = req.session;
  const referer = req.get("referer") || "/dashboard/profile";

  const parsed = validateParse(profileUpdateValidator, req.body);
  if (!parsed.success) {
    const messages = Object.values(parsed.errors).join(" ");
    req.session.flash = {
      alert: { type: "error", message: messages },
    };
    return res.redirect(referer);
  }

  const { full_name, date_of_birth, address, phone, gender } = parsed.data;

  try {
    const currentProfile = await getProfileByUser(user._id);
    if (!currentProfile) {
      req.session.flash = {
        alert: { type: "error", message: "Profil tidak ditemukan." },
      };
      return res.redirect(referer);
    }

    if (currentProfile.phone !== phone) {
      const isUsed = await checkIfProfileExistsByPhone(phone);
      if (isUsed) {
        req.session.flash = {
          alert: {
            type: "error",
            message: "Nomor telepon sudah digunakan oleh akun lain.",
          },
        };
        return res.redirect(referer);
      }
    }

    await updateProfileByUser(user._id, {
      full_name,
      date_of_birth,
      address,
      phone,
      gender,
    });

    req.session.flash = {
      alert: { type: "success", message: "Profile berhasil diperbaruhi." },
    };
    return res.redirect(referer);
  } catch (err) {
    console.error("Gagal update profile: ", err);
    req.session.flash = {
      alert: {
        type: "error",
        message: "Terjadi kesalahan saat memperbaruhi profil.",
      },
    };
    return res.redirect(referer);
  }
};

/**----------------------
 *    ACCOUNT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardAccount = async (req, res) => {
  const account = await getUserById(req.session.user._id);
  return res.render("pages/dashboard/account", {
    user: account,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardAccountUpdateInfo = async (req, res) => {
  const { user } = req.session;
  const referer = req.get("referer");

  const parsed = validateParse(accountUpdateValidator, req.body);
  if (!parsed.success) {
    const messages = Object.values(parsed.errors).join(" ");
    req.session.flash = {
      alert: { type: "error", message: messages },
    };
    return res.redirect(referer);
  }

  const { username, email } = parsed.data;

  try {
    const currentUser = await getUserById(user._id);
    if (!currentUser) {
      req.session.flash = {
        alert: { type: "error", message: "Profil tidak ditemukan." },
      };
      return res.redirect(referer);
    }

    if (currentUser.username !== username) {
      const isUsernameUsed = await checkIfUserExistsByCreds(username);
      if (isUsernameUsed) {
        req.session.flash = {
          alert: {
            type: "error",
            message: "Username sudah digunakan oleh akun lain.",
          },
        };
        return res.redirect(referer);
      }
    }

    if (currentUser.email !== email) {
      const isEmailUsed = await checkIfUserExistsByCreds(email);
      if (isEmailUsed) {
        req.session.flash = {
          alert: {
            type: "error",
            message: "Email sudah digunakan oleh akun lain.",
          },
        };
        return res.redirect(referer);
      }
    }

    await updateUser(user._id, { username, email });

    req.session.flash = {
      alert: { type: "success", message: "Akun berhasil diperbarui." },
    };
    return res.redirect(referer);

  } catch (err) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Terjadi kesalahan saat memperbarui akun.",
      },
    };
    return res.redirect(referer);
  }
};


/**
 * @type {express.Handler}
 */
export const dashboardAccountUpdatePassword = (req, res) => {
  /**
   * TODO: Implement change password functionality
   * Body: (old_password, new_password)
   * Step:
   * 1. validate if old_password is correct, if not redirect back with error
   * 2. validate new_password (min length, etc)
   * 3. update password in database
   * 4. logout user from session (destroy session)
   * 5. redirect to login page with success message
   * 6. if error, redirect back with error message
   */

  return res.redirect("/dashboard/account");
};

/**----------------------
 *    PRODUCT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardProduct = async (req, res) => {
  const products = await getProducts();
  return res.render("pages/dashboard/product/index", {
    products,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardProductNew = async (req, res) => {
  const categories = await getCategoriesForSelect();
  return res.render("pages/dashboard/product/new", {
    categories,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardProductCreate = async (req, res) => {
  const result = validateParse(productCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/dashboard/product/new");
  }

  const product = await createProduct(result.data);
  if (!product) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat produk, coba lagi" },
    };
    return res.redirect("/dashboard/product/new");
  }

  req.session.flash = {
    alert: { type: "success", message: "Produk berhasil dibuat" },
  };

  return res.redirect("/dashboard/product/new");
};

export const dashboardProductDetail = async (req, res) => {
  const slug = req.params.slug;
  const product = await getProductByIdWithCategory(slug);
  if (!product) return res.sendStatus(404);

  return res.render("pages/dashboard/product/detail", {
    product,
  });
};

export const dashboardProductEdit = async (req, res) => {
  const slug = req.params.slug;
  const categories = await getCategoriesForSelect();

  const product = await getProductById(slug);
  if (!product) return res.sendStatus(404);

  req.session.form = req.body;

  return res.render("pages/dashboard/product/edit", {
    categories,
    product,
  });
};

export const dashboardProductUpdate = async (req, res) => {
  const slug = req.params.slug;
  const categories = await getCategoriesForSelect();

  const product = await getProductById(slug);
  if (!product) return res.sendStatus(404);

  const result = validateParse(productCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect(`/dashboard/product/${slug}/edit`);
  }

  const updated = await updateProduct(slug, result.data);
  if (!updated) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal mengubah produk, coba lagi" },
    };
    return res.redirect(`/dashboard/product/${slug}/edit`);
  }

  req.session.flash = {
    alert: { type: "success", message: "Produk berhasil diubah" },
  };

  return res.redirect(`/dashboard/product/${slug}/edit`);
};

/**----------------------
 *    CATEGORY
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardCategory = async (req, res) => {
  const categories = await getCategories();
  return res.render("pages/dashboard/category/index", {
    categories,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryNew = async (req, res) => {
  return res.render("pages/dashboard/category/new");
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryCreate = async (req, res) => {
  const result = validateParse(categoryCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/dashboard/category/new");
  }

  const category = await createCategory(result.data);
  if (!category) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat kategori, coba lagi" },
    };
    return res.redirect("/dashboard/category/new");
  }

  req.session.flash = {
    alert: { type: "success", message: "Kategori berhasil dibuat" },
  };

  return res.redirect("/dashboard/category/new");
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryEdit = async (req, res) => {
  const slug = req.params.slug;
  const category = await getCategoryBySlug(slug);
  if (!category) return res.sendStatus(404);
  return res.render("pages/dashboard/category/edit", { category });
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryUpdate = async (req, res) => {
  const slug = req.params.slug;
  const isExists = await checkCategoryExists(slug);
  if (!isExists) return res.sendStatus(404);

  req.session.form = req.body;

  const result = validateParse(categoryCreateValidator, req.body);
  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.form = req.body;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };

    return res.redirect(`/dashboard/category/${slug}`);
  }

  const updated = await updateCategory(slug, result.data);
  if (!updated) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Gagal memperbarui kategori, coba lagi",
      },
    };

    return res.redirect(`/dashboard/category/${slug}`);
  }

  req.session.flash = {
    alert: { type: "success", message: "Kategori berhasil diperbarui" },
  };
  return res.redirect(`/dashboard/category/${slug}`);
};

/**----------------------
 *    ORDER
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardOrder = (req, res) => {
  return res.render("pages/dashboard/order/index");
};

/**
 * @type {express.Handler}
 */
export const dashboardOrderDetail = (req, res) => {
  return res.render("pages/dashboard/order/detail");
};

/**----------------------
 *    TRANSACTION
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardTransaction = (req, res) => {
  return res.render("pages/dashboard/transaction");
};

/**----------------------
 *    PAYMENT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardPayment = (req, res) => {
  return res.render("pages/dashboard/payment");
};
