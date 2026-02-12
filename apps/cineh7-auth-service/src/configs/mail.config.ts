import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        const user = this.configService.get('EMAIL_USER') || "hhoang1072003@gmail.com";
        const pass = this.configService.get('EMAIL_PASS') || "bxrt dksg idqf ehsh";

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: `"CineH7" <${this.configService.get('EMAIL_USER')}>`,
            to,
            subject,
            html,
        });
    }
}