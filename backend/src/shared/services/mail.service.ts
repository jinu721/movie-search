import nodemailer from 'nodemailer';
import { injectable } from 'inversify';
import { env } from '@config/env';

@injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: parseInt(env.SMTP_PORT),
            secure: false, 
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
        });
    }

    async sendOtpEmail(to: string, otp: string): Promise<void> {
        const mailOptions = {
            from: `"Movie API" <${env.SMTP_FROM}>`,
            to,
            subject: 'Your Verification Code',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verify your account</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #6366f1; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            if (env.isProduction) throw error;
        }
    }
}
