const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a5de55c0dfd478",
              pass: "937ac54cae59ec"
            }
        });

        const mailOptions = {
            from: "foundInn" + "<foundinn@gmail.com>",
            to,
            subject,
            text,
        };

        await transport.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
