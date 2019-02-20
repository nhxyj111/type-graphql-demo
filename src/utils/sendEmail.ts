import nodemailer from "nodemailer";

export async function sendEmail() {
  let account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "stmp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const mailOptions = {
    from: "type-graphql <xxx@xxx.xxx>",
    to: "xxx@xxx.xxx",
    subject: "xxx",
    text: "hello",
    html: "hello"
  };

  let info = await transporter.sendMail(mailOptions);

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
