import express from "express";
import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");
const twilio = require("twilio");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pass,
  },
});

// Configure the Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/reset", async (req, res, next) => {
  try {
    const phone = req.body.phone;
    // Generate a verification code
    const verificationCode = generateVerificationCode();

    // Send the verification cod e via SMS
    const smsOptions = {
      body: `Your verification code is: ${verificationCode}`,
      to: phone,
      from:process.env.TWILIO_PHONE_NUMBER,
    };
    await twilioClient.messages.create(smsOptions);
    await prisma.user.update({
      where: {
        phone: phone,
      },
      data: {
        verificationCode: verificationCode,
      },
    });
  } catch (error: any) {
    console.error(error);
    next(new Error("Something went wrong to reset password!"));
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    const username = email.split("@")[0];
    console.log(verificationCode)
    // Retrieve the user from the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    // Check if the verification code matches
    if (user.verificationCode !== verificationCode) {
      throw new Error("Invalid verification code!");
    }
    console.log(user.verificationCode)
    // Generate a new password
    const password = generatePassword();

    // Update the user's password
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });
     const mailOptions = {
            from: "aftercode212@gmail.com",
            to: user.email,
            subject: "Your new password",
            html: `
            <table bgcolor="#ebebe0" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td  align="center">
                    <table bgcolor="#ffffff" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border: 1px solid #cccccc;">
                        <tr>
                            <td style="padding: 40px 0 30px 0;" align="center">
                                <img src="https://aftercode.tn/logo-after-code.png" alt="Your Company" width="300" height="200" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 30px 40px 30px;" align="left">
                                <h1 style="font-size: 24px; margin: 0; font-family: Arial, sans-serif;color: #000000;">Welcome to After Code!</h1>
                                <p style="font-size: 16px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif; color: #000000;">Hi ${username},</p>

                                <p style="font-size: 14px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif; color: #000000;">Here is your new password:</p>
                                <table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                                    <tr>
                                        <td style="padding-right: 10px;"><strong>Password:</strong></td>
                                        <td>${password}</td>
                                    </tr>
                                </table>
                                <p style="font-size: 14px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif;color: #000000;">To ensure the security of your account, we recommend changing your password immediately.</p>
                                <p style="font-family: Arial, sans-serif; color: #000000;">Please visit our website and change your password:</p>
                                <p style="padding-right: 10px;color: #000000;"><strong>Website:</strong></p>
                                <table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin-top: 30px; margin: 0 auto;">
                                    <tr>
                                        <td>
                                        <a href="http://localhost:3000/login2/" style="text-decoration: none;">
                                        <button style="background-color:  #009999; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;margin: 0 auto;"> Login Now </button>
                                    </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#eeeeee" style="padding: 10px 30px;" align="center">
                                <p style="font-size: 14px; margin: 0; font-family: Arial, sans-serif;">This email was sent to ${user.email} as part of your company account.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
            `,
        };
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error: any) {
  console.error(error); // Log the error to the console for debugging purposes
  res.status(500).json({ error: "An unexpected error occurred during verification." });
}
});

// Function to generate a random password
function generatePassword() {
    const length = 15;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
}

// Function to generate a verification code
function generateVerificationCode() {
  const length = 6;
  const charset = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += charset[Math.floor(Math.random() * charset.length)];
  }
  return code;
}

export default router;
