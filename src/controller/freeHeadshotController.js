import dotenv from "dotenv";
import { sendMailToFreeCustomer } from "../utils/nodeMailer.js";
import { uploadFile } from "../utils/cloudinary.js";
import { addCustomer } from "./customersController.js";

dotenv.config();

export const freeHeadshotCheckout = async (req, res) => {
  // console.log(req.files)
  if (req?.body?.email) {
    const imgResult = await uploadFile(req.files);
    const body = req.body;
    body.generationType = "freeHeadshot";
    const userData = {
      body: JSON.stringify(body),
    };
    await addCustomer(userData, imgResult?.result);
    if (imgResult) {
      await sendMailToFreeCustomer(userData, imgResult.result);
      res.status(200).json({
        email: req.body.email,
        gender: req.body.gender,
        amount: "0",
        packName: "Free Headshot",
      });
    } else {
      res.send({
        status: false,
        message:
          "There's some error completing this process, kindly go back to main site",
      });
    }
  } else {
    res.send({
      status: false,
      message:
        "There's some error completing this process, kindly go back to main site",
    });
  }
};
