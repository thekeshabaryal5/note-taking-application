import expressAsyncHandler from "express-async-handler";

const logoutController = expressAsyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export default logoutController;
