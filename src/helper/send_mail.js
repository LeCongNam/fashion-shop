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
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: "natasha8765@mymailcr.com, natasha8765@mymailcr.com", 
    subject: "Fashion Shop System", 
    text: "Hello, natasha8765. You require NewPassword. This is scret code send by System. Please public any one", 
    html: `<b>Your Code: ${code} </b>`, 
  });

  console.log("Send Mail Successfully", info.messageId);

}


module.exports = sendMailBySystem