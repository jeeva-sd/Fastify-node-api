import nodemailer, { Transporter } from 'nodemailer';
import { log, error as errorLog } from 'console';
import { appConfig } from '~/config';
import { extractError } from '~/helpers';
import { Injectable } from '~/server';

@Injectable()
export class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: appConfig.mailer.service,
            auth: {
                user: appConfig.mailer.appEmail,
                pass: appConfig.mailer.password
            }
        });
    }

    async sendMail(to: string, subject: string, text?: string, html?: string): Promise<boolean> {
        try {
            const mailOptions = {
                to,
                subject,
                text,
                html
            };

            const info = await this.transporter.sendMail(mailOptions);
            log('Email sent:', info.response);
            return true;
        } catch (error) {
            errorLog('Error in sending mail:', extractError(error));
            return false;
        }
    }
}