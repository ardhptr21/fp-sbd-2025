import { deleteTrash, getTrashItems, restoreTrash } from "../../repositories/trash-repo.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardTrash = async (req, res) => {
  const trashes = await getTrashItems();
  return res.render("pages/dashboard/trash", {
    trashes,
  });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardTrashDelete = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/trash";
  const { id } = req.params;

  const trashItem = await deleteTrash(id);
  if (!trashItem) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Data sampah tidak ditemukan atau tidak dapat dihapus.",
      },
    };
    return res.redirect(referer);
  }

  req.session.flash = {
    alert: {
      type: "success",
      message: "Data sampah berhasil dihapus.",
    },
  };
  return res.redirect(referer);
};

/**
 * @type {import('express').Handler}
 */
export const dashboardTrashRestore = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/trash";
  const { id } = req.params;

  const restoredItem = await restoreTrash(id);
  if (!restoredItem) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Data sampah tidak ditemukan atau tidak dapat dipulihkan.",
      },
    };
    return res.redirect(referer);
  }

  req.session.flash = {
    alert: {
      type: "success",
      message: "Data sampah berhasil dipulihkan.",
    },
  };
  return res.redirect(referer);
};
