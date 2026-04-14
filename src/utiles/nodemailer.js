import nodemailer from "nodemailer";

export const sendemail= async (to ,text,subject)=>{

    let transporter= nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.MY_PASS
        }
    })

    let info = await transporter.sendMail({
        from:process.env.MY_EMAIL,
        to:to,
        subject:subject,
        text:text
    })
    console.log("Email sent ",info.messageId);



}