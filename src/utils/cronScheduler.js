// cronScheduler.js
const cron = require('node-cron');

const TELEGRAM_TOKEN = '7212477619:AAGsxhUyL4mTu7rOqHhmnJzaYxX3qcY95qA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

let tasks = {}; // Para mantener un registro de las tareas programadas

exports.schedule = async (cronTime, destinatario, mensaje) => {
  // Cancelar tarea previa si existe
  if (tasks[destinatario]) {
    tasks[destinatario].stop();
  }

  // Crear nueva tarea
  const task = cron.schedule(cronTime, async () => {
    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: destinatario,
          text: mensaje
        }),
      });

      // Verificar la respuesta de la API
      const data = await response.json();
      if (!data.ok) {
        console.error('Error al enviar el mensaje:', data.description);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
    
    // Limpiar tarea después de ejecutar
    task.stop();
    delete tasks[destinatario];
  });

  tasks[destinatario] = task;
};
