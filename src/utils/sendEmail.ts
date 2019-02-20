import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  let account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const mailOptions = {
    from: "type-graphql <xxx@xxx.xxx>",
    to: email,
    subject: "xxx",
    html: `<a href="${url}">${url}</a>`
  };

  let info = await transporter.sendMail(mailOptions);

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
