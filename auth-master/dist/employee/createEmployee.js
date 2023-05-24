"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const nodemailer = require("nodemailer");
require('dotenv').config();
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.use(express_1.default.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.Email,
        pass: process.env.Pass,
    },
});
router.post("/", async (req, res, next) => {
    try {
        const password = generatePassword();
        const user = await prisma.user.create({
            data: {
                email: req.body.email, username: req.body.username, roles: 'Employee', password,
            },
        });
        console.log(user);
        const employee = await prisma.employee.create({
            data: {
                avatar: req.body.avatar,
                phone: req.body.phone, departmentId: req.body.departmentId,
                userId: user.id
            },
            include: {
                department: true
            }
        });
        console.log(employee);
        const mailOptions = {
            from: "aftercode212@gmail.com",
            to: user.email,
            subject: "Your new account credentials",
            html: `
            <table bgcolor="#ebebe0" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td  align="center">
                    <table bgcolor="#ffffff" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; border: 1px solid #cccccc;">
                        <tr>
                            <td style="padding: 40px 0 30px 0;" align="center">
                                <img src="https://aftercode.tn/logo-after-code.png" alt="Your Company" width="200" height="200" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 30px 40px 30px;" align="left">
                                <h1 style="font-size: 24px; margin: 0; font-family: Arial, sans-serif;color: #000000;">Welcome to After Code!</h1>
                                <p style="font-size: 16px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif; color: #000000;">Hi ${user.username},</p>

                                <p style="font-size: 16px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif; color: #000000;">Your account has been created. Here are your credentials:</p>
                                <table style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                                    <tr>
                                        <td style="padding-right: 10px;">Email:</td>
                                        <td>${user.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 10px;">Password:</td>
                                        <td>${password}</td>
                                    </tr>
                                </table>
                                <p style="font-size: 16px; line-height: 1.5; margin: 20px 0 30px 0; font-family: Arial, sans-serif;color: #000000;">Please visit our website to log in and change your password.</p>
                                <p style="padding-right: 10px;color: #000000;"><strong>Website:</strong></p>
                                <table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin-top: 30px; margin: 0 auto;">
                                    <tr>
                                        <td>
                                        <a href="https://yourcompany.com" style="text-decoration: none;">
                                            <button style="background-color:  #009999; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;margin: 0 auto;">Reset Password </button>
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
        res.json({ user });
    }
    catch (error) {
        console.error("Error adding employee:", error);
        next(new Error('Something went wrong to add an Employee!'));
    }
});
function generatePassword() {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
}
exports.default = router;
//# sourceMappingURL=createEmployee.js.map