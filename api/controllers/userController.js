const asyncHandler = require("express-async-handler");

export const registerUser = asyncHandler(async () => {
  const { name, email, password } = req.body;
});
