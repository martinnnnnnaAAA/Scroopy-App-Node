const messageServices = require('../services/MessageServices');

exports.scheduleMessage = async (req, res) => {
  const { titulo, destinatario, mensaje, fecha, hora, color, isAllDay } = req.body;

  if (!titulo || !destinatario || !mensaje || !fecha || !hora) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await messageServices.scheduleMessage({
      titulo,
      destinatario,
      mensaje,
      fecha,
      hora,
      color,
      isAllDay
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in scheduleMessage:', error);
    res.status(500).json({ error: error.message });
  }
};




// const messageServices = require('../services/MessageServices');

// exports.scheduleMessage = async (req, res) => {
//   const { titulo, destinatario, mensaje, fecha, hora, color, isAllDay } = req.body;

//   if (!titulo || !destinatario || !mensaje || !fecha || !hora) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     await messageServices.scheduleMessage({
//       titulo,
//       destinatario,
//       mensaje,
//       fecha,
//       hora,
//       color,
//       isAllDay
//     });
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };