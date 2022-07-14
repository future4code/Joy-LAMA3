import { IMailAdapter, ISendMailData } from "../inodemailer-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ded32b2eb4256a",
    pass: "4ac20d0ed7bd1d"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail ({ subject, body, email }: ISendMailData) {
    await transport.sendMail({
      from: `"Equipe Dianhos Tech S.A"  <dianhos_tech@tech.com>`,
      to: `<${email}>`,
      subject,
      html: body
    });
  };
};