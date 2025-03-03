/** @format */

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { generateOtp } from 'src/utils';

@Injectable()
export class SendMailService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  // @MessagePattern(RMQNotificationChannels.SENDMAIL_OTP)
  // async listenMail(sendMailDto) {
  //   console.log("🚀 ~ SendMailService ~ listenMail ~ SENDMAIL_OTP:", sendMailDto)

  // }



  async sendMail(sendMailDto) {
    const otp = generateOtp(6);

    const transporter = nodemailer.createTransport({
      // config mail server
      service: 'Gmail',
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
    const mainOptions = {
      from: '"Adora Agent" <AdoraAgent.dev@gmail.com>',
      to: sendMailDto.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `
    <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <div style="margin: 15px">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pools Dash_Board</a>
      </div>
      <p style="font-size:1.1em">Hi!</p>
      <p style="font-size:1.5em">Your OTP code is: 
      <span style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"> ${otp}</span>
      </p>
    </div>
  </div>
        </tbody>
       `,
    };

    // const createOtp = async () => {
    //   const otpDto = {
    //     code: otp,
    //     user_id: sendMailDto.userId,
    //     request_type: sendMailDto.type as any,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   };

    //   this.telegram.sendMessage({ method: 'sendMail', otpDto });
    // };

    const cb = async function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response, otp);
        // createOtp();
      }
    };

    transporter.sendMail(mainOptions, cb);
  }
}
