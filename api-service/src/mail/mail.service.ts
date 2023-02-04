import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNewPasswordMail(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password reset request',
      template: './password-reset', // `.hbs` extension is appended automatically
      context: {
        email,
        password,
      },
    });
  }
}
