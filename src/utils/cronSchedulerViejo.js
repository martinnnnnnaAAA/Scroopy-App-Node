const cron = require('node-cron');
const fetch = require('node-fetch');

const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

let tasks = {}; // Para mantener un registro de las tareas programadas

exports.schedule = (cronTime, destinatario, mensaje) => {
  // Cancelar tarea previa si existe
  if (tasks[destinatario]) {
    tasks[destinatario].stop();
  }

  // Crear nueva tarea
  const task = cron.schedule(cronTime, async () => {
    try {
      await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: destinatario, text: mensaje }),
      });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
    
    // Limpiar tarea después de ejecutar
    task.stop();
    delete tasks[destinatario];
  });

  tasks[destinatario] = task;
};
