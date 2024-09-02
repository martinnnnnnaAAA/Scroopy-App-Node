const { Router } = require('express');
require('dotenv').config();
const EventServices = require('../services/EventServices');

const router = Router();
const svc = new EventServices();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const eventos = await svc.getEventoDeUsuario(id);
        return res.status(200).json({ success: true, message: eventos });
    } catch (e) {
        return res.status(500).send({ error: `Hubo un error al obtener los datos de la base de datos: ${e.message}` });
    }
});

router.post("/", async (req, res) => {
    try {
        const { titulo, fecha, horaInicio, horaFin, color, isAllDay, descripcion, fk_usuario, tipo } = req.body;

        const missingParams = [
            { name: 'titulo', value: titulo },
            { name: 'fecha', value: fecha },
            { name: 'horaInicio', value: horaInicio },
            { name: 'horaFin', value: horaFin },
            { name: 'color', value: color },
            { name: 'isAllDay', value: isAllDay },
            { name: 'descripcion', value: descripcion },
            { name: 'fk_usuario', value: fk_usuario },
            { name: 'tipo', value: tipo }
        ].filter(param => param.value == null || param.value === "")
          .map(param => param.name);

        if (missingParams.length > 0) {
            return res.status(400).send({ 
                error: `Hubo un error al insertar el evento, los siguientes parámetros están vacíos o son nulos: ${missingParams.join(', ')}.` 
            });
        }

        const respuesta = await svc.postEvento(titulo, fecha, horaInicio, horaFin, color, isAllDay, descripcion, fk_usuario, tipo);

        res.status(200).json({ success: true, message: respuesta });
    } catch (e) {
        res.status(500).send({ error: `Hubo un error al insertar el evento: ${e.message}` });
    }
});



module.exports = router;