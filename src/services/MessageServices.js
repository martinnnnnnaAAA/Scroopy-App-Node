// const cronScheduler = require('../utils/cronScheduler');

// exports.scheduleMessage = async ({ titulo, destinatario, mensaje, fecha, hora, color, isAllDay }) => {
//   const datetime = new Date(`${fecha}T${hora}`); // Combinar fecha y hora en un solo objeto Date
//   const now = new Date();

//   if (datetime <= now) {
//     throw new Error('La hora programada ya ha pasado');
//   }

//   const cronTime = `${datetime.getSeconds()} ${datetime.getMinutes()} ${datetime.getHours()} ${datetime.getDate()} ${datetime.getMonth() + 1} *`;

//   // Programar el mensaje
//   await cronScheduler.schedule(cronTime, destinatario, mensaje);
// };


const cronScheduler = require('../utils/cronScheduler');

exports.scheduleMessage = async ({ titulo, destinatario, mensaje, fecha, hora, color, isAllDay }) => {
  const datetime = new Date(`${fecha}T${hora}`);
  const now = new Date();

  if (datetime <= now) {
    throw new Error('La hora programada ya ha pasado');
  }

  const cronTime = `${datetime.getSeconds()} ${datetime.getMinutes()} ${datetime.getHours()} ${datetime.getDate()} ${datetime.getMonth() + 1} *`;

  await cronScheduler.schedule(cronTime, destinatario, mensaje);
};
