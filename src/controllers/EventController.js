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
   
        const respuesta = await svc.postEvento(req.query.titulo, req.query.fecha, req.query.horaInicio, req.query.horaFin, req.query.color, req.query.isAllDay, req.query.descripcion, req.query.fk_usuario, req.query.tipo);
        if([req.query.titulo, req.query.fecha, req.query.horaInicio, req.query.horaFin, req.query.color, req.query.isAllDay, req.query.descripcion, req.query.fk_usuario, req.query.tipo].some(element => element == null || element === "")){
            return res.status(400).send({ error: `Hubo un error al insertar el evento, alguno de los parametros esta vacio: ${e.message}` });
            
        } else{
       res.status(200).json({ success: true, message: eventos });
       return respuesta
    }
});

module.exports = router;