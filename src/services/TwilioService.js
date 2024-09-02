// const twilio = require('twilio');

// const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC5f0fb4346fef6cd1f11501569ac8a830';
// const authToken = process.env.TWILIO_AUTH_TOKEN || 'c98d83549be499edd5c3f4eb5d95b2c1';
// const client = twilio(accountSid, authToken);

// const sendMessage = async ({ recipient, messageBody, sendAt }) => {
//   try {
//     const message = await client.messages.create({
//       body: messageBody,
//       messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || 'MGa9fa7cc9ede7ffdcb70d502858e07b2a',
//       sendAt: new Date(sendAt).toISOString(),
//       scheduleType: 'fixed',
//       to: recipient,
//     });

//     return message.sid;
//   } catch (error) {
//     console.error('Error al enviar el mensaje:', error);
//     throw new Error('Error al enviar el mensaje');
//   }
// };

// module.exports = {
//   sendMessage,
// };



// src/services/TwilioService.js
const accountSid = 'AC5f0fb4346fef6cd1f11501569ac8a830';
const authToken = 'c98d83549be499edd5c3f4eb5d95b2c1';
const client = require('twilio')(accountSid, authToken);

const sendMessage = async ({ to, body }) => {
    return client.messages.create({
        body,
        messagingServiceSid: 'MG1cde048b1ce36136bbc6efca98897f77',
        to
    });
};

module.exports = {
    sendMessage,
};
