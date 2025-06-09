export const generateUsernameFromEmail = (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email provided");
  }

  const username = email.split("@")[0];
  return username.toLowerCase();
};
