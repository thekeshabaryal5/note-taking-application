import { serverUrl } from "../constant.js";
import upload from "./uploadFile.js";

const uploadProfilePicture = (req, res, next) => {
  {
    upload.single("profile_image")(req, res, (err) => {
      if (err) {
        return next(new Error(err.message));
      }
      if (req.file) {
        req.body.profile_image = `${serverUrl}/${req.file.filename}`; // Add profile image name in the body if the image is present
      } else {
        req.body.profile_image = null;
      }
      next();
    });
  }
};

export default uploadProfilePicture;
