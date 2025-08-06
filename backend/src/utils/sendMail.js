import nodemailer from "nodemailer";
import { emailAddress, emailHost, emailPassword } from "../constant.js";

let transporterInfo = {
  host: emailHost,
  port: 587,
  secure: false,

  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
};

export let sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo); 
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};

