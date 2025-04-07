import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import Client from "../models/Client.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "process";

const registerclientController = {};

registerclientController.register = async (req, res) =>{
    const{
        name, 
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
    }=req.body;

    try {
        const existClient = await Client.findOne({email})
        if(existClient){
            return res.json({message: "Client alredy exist"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newClient = new Client({
        name, 
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui: dui || null,
        isVerified,
        })

        await newClient.save();
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const secretKey = "miClaveSecreta"; 
        
        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode },
            secretKey,                   
            { expiresIn: "1h" }          
        );
        res.cookie("VerificationToken",tokenCode,  {maxAge: 2*60*60*1000})

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass,
            }
        });
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: 'Verificación de cuenta',
            text: `Tu código de verificación es: ${verificationCode}`
        };

        await transporter.sendMail(mailOptions,(error, info)=>{
            if(error) return res.json({message: "Error"})
                console.log("Correo enviado" + info.response)
        })

        res.json({ message: "Client registered successfully", token: tokenCode });
    } catch (error) {
        res.json({message: "Error" + error})
    }

    
}
registerclientController.verifyEmail = async (req, res)=>{
    const {verificationCode} = req.body;

    const token = req.cookies.VerificationToken;

    try {
        const decoded = jsonwebtoken.verify(token, secretKey)
        const {email, verificationCode, storedCode}= decoded;

        if (verificationCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        const client = await Client.findOne({email});
        client.isVerified = true;
        await client.save();

        res.json({message: "Email verified succesfull"})

        res.clearCookie("VerificationToken")
    } catch (error) {
        res.json({message: "error"})
    }
}
export default registerclientController;