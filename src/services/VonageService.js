// services/VonageService.js
import Vonage from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

export const sendSms = (to, from, text) => {
  return new Promise((resolve, reject) => {
    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        reject(err);
      } else {
        resolve(responseData);
      }
    });
  });
};
