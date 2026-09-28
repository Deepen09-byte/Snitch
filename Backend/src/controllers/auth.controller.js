import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res){

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
}

export const register = async (req, res) => {
  const { email, contact, password, fullName } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this email or contact number already exists.",
        });
    }

    const user = await userModel.create({ email, contact, password, fullName });

    sendTokenResponse(user, res);

  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
