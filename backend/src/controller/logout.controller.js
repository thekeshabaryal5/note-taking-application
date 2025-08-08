import expressAsyncHandler from "express-async-handler";

const logoutController = expressAsyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    (error.message = "Server error"), (error.status = 500);
    throw error;
  }
});

export default logoutController;
