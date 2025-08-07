const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // true for port 465, false for port 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"SkillNova" <${process.env.MAIL_USER}>`,  // ✅ THIS IS CRUCIAL
            to: email,                                        // ✅ Must be email, not domain
            subject: title,
            html: body,
        });

        console.log("✅ Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.log("❌ MailSender error:", error);
        throw error;
    }
};

module.exports = mailSender;
