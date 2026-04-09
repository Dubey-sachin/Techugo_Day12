import nodemailer from "nodemailer";

export const sendemail= async ()=>{

    let transporter= nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.MY_PASS
        }
    })

    let info = await transporter.sendMail({
        from:process.env.MY_EMAIL,
        to:process.env.RECIEVERS_EMAIL,
        subject:"message ",
        text:"hello "
    })
    console.log("Email sent ",info.messageId);



}