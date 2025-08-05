
import multer from "multer";
import path from "path";


let limits = {
  fileSize: 1024 * 1024 * 5, //2Mb
  // the max file size (in bytes)

};


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let staticFolder = "./public";

    cb(null, staticFolder);

  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let fileName = Date.now() + ext;
    cb(null, fileName);
  },
  
});


let fileFilter = (req, file, cb) => {
  let validExtensions = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".PNG",
  ];


  let originalName = file.originalname;
  let originalExtension = path.extname(originalName); 
  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
    
  } else {
    cb(new Error("File is not supported only file types of jpg/png/jpeg"), false);
  }
};


const upload = multer({
  storage: storage, 
  fileFilter: fileFilter, 
  limits: limits, 
});


export default upload;


