import nodemailer from "nodemailer";


export const sendOTPtoMail = async (email, otp) => {
    try {
        const transporter = new nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "glakshita432006@gmail.com",
                pass: "cckkugwqylyqwvkk"
            }
        })

        try {
            await transporter.verify();
            console.log("Server can send mails")
        } catch (err) {
            console.log(`Server can't send as err: ${err.message}`);
        }

        try {
            const info = await transporter.sendMail({
                from: '"Anonymis" glakshita432006@gmail.com',
                to: email,
                subject: "OTP for changing the Password",
                text: `Your OTP is ${otp}`
            })

            console.log(`Mail sent : ${info.messageId}`);

        } catch (err) {
            console.log(`Couldn't send the email ${err.message}`);
        }
    } catch (err) {
        console.log(`Error in sendOTPtoMail : ${err.message}`)
    }
}
