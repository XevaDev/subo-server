"use strict";
const nodemailer = require("nodemailer");
async function verifyEmail(to, token, serverBase) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Subo 👻" <no-reply@subo.com>',
        to: `${to}`,
        subject: "Subo Account Confirmation",
        text: "Please confirm your account by clicking on this link: ",
        html: `<a href="${serverBase}/confirm/${token}">Here</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = verifyEmail;
//# sourceMappingURL=verifyEmail.js.map