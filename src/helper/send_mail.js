const nodemailer = require("nodemailer");


async function sendMailBySystem(code) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    tls: false,
    auth: {
      user: 'namlem4u@gmail.com' ,
      pass: process.env.PASSWORD_GMAIL, 
    },
  });

  let info = await transporter.sendMail({
    from: '"System Foody" <foody-shop.com>', 
    to: "namlem4u@gmail.com namlem4u@gmail.com", 
    subject: "Fashion Shop System", 
    text: "Hello, natasha876", 
    html: `<b>Your Code: ${code} </b> 
            <h1>Please don't Public Secret Code for Anyone. If Public, Account of You Will Hacked!!<h1>`, 
  });

  console.log("Send Mail Successfully", info.messageId);

}


module.exports = sendMailBySystem