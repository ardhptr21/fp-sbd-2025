/**
 * @readonly
 * @enum {string}
 */
export const UserRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

/**
 * @typedef {('admin' | 'customer')} RoleType
 * @type {(roles?: RoleType[]) => import('express').Handler}
 */
export const authenticate = (roles) => async (req, res, next) => {
  if (!req.session.isAuthenticated) return res.redirect("/auth/login");
  if (!roles || !roles.length) return next();
  if (roles.some((role) => req.session.user.role === role)) return next();
  return res.sendStatus(403);
};

/**
 * @typedef {import('express').Handler}
 */
export const unauthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) return res.redirect("/");
  return next();
};
