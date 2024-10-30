import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class AwsSesHelper {
  private transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 465,
      auth: {
        user: process.env.AWS_SES_SMTP_USERNAME,
        pass: process.env.AWS_SES_SMTP_PASSWORD,
      },
    });
  }

  async sendSuccessEmail(email: string, resourceId: string, fullname: string) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.AWS_SES_SMTP_SENDER_EMAIL as string,
        to: email,
        subject: "Your video has been converted successfully",
        html: `
            <div>
                <h2 style="color: green;">Dear ${fullname}, your video has been converted successfully !!!</h2>
                <p>
                    Click <a href="${process.env.RESOURCE_PAGE_URL}/${resourceId}">here</a> to
                    view and download your audio file
                </p>
            </div>
        `,
      };

      const data = await this.transporter.sendMail(mailOptions);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async sendFailureEmail(email: string, resourceId: string, fullname: string) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.AWS_SES_SMTP_SENDER_EMAIL as string,
        to: email,
        subject: "Your video has not been converted.",
        html: `
            <div>
                <h2 style="color: red;">Dear ${fullname}, your video convertion failed</h2>
                <p>
                    Click <a href="${process.env.RESOURCE_PAGE_URL}/${resourceId}">here</a> to
                    view and retry
                </p>
            </div>
        `,
      };

      const data = await this.transporter.sendMail(mailOptions);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
