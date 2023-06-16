import express from "express";
import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");
require('dotenv').config();

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

router.post("/", async (req, res, next) => {
    try {
        const password = generatePassword(); 
        const email = req.body.email;
        const username = email.split('@')[0]; // Génération du nom d'utilisateur à partir de l'adresse e-mail
    
        const user = await prisma.user.create({
            
            data: {
                email:req.body.email, username: username, roles: 'Employee', password,
            },
        });
        console.log(user);
        
            const employee = await prisma.employee.create({
                data: {
                    avatar: req.body.avatar,
                    fullname: req.body.fullname,
                    departmentId:req.body.departmentId,
                    userId: user.id
                },
        include:{
            department: true
        }
            });
        console.log(employee)
    
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
                                <img src="https://aftercode.tn/logo-after-code.png" alt="Your Company" width="300" height="200" style="display: block;" />
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

        res.json({user });
    } catch (error: any) {
            console.error("Error adding employee:", error);
        next(new Error('Something went wrong to add an Employee!'));
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

export default router;
//<img src=${employee.avatar} alt="Avatar of employee" />
