import * as sgMail from '@sendgrid/mail';
import * as config from '../config';

sgMail.setApiKey(config.SENDGRID_API_KEY);

/**
 * [sendEmail description]
 * @param  email [description]
 * @param  text  [description]
 * @return       [description]
 */
export async function sendEmail (email, text) {
  const msg = {
    from: 'alerts@company.com',
    subject: 'Alert!!!! Threshold exceeded',
    text: text,
    to: email,
  };

  return sgMail.send(msg);
}
