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

  async sendSuccessEmail(email: string, resourceId: string) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.AWS_SES_SMTP_SENDER_EMAIL as string,
        to: email,
        subject: "Your video has been converted successfully",
        html: `
            <div>
                <h1 style="color: green;">Your video has been converted successfully !!!</h1>
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

  async sendFailureEmail(email: string, resourceId: string) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.AWS_SES_SMTP_SENDER_EMAIL as string,
        to: email,
        subject: "Your video has not been converted.",
        html: `
            <div>
                <h1 style="color: red;">Your video convertion failed</h1>
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
