const EventRepository = require('../repositories/EventRepositories');

class EventServices {
    getEventoDeUsuario = async (id) => {
        try {
            const repo = new EventRepository();
            const eventos = await repo.getEventosDeUsuario(id);
            return eventos;
        } catch (error) {
            throw new Error(`Error al obtener los eventos del usuario: ${error.message}`);
        }
    }

    postEvento = async (titulo, fecha, horaInicio, horaFin, color, isAllDay, descripcion, fk_usuario, tipo) => {
        try {
            const repo = new EventRepository();
            const resultado = await repo.postEvento(titulo, fecha, horaInicio, horaFin, color, isAllDay, descripcion, fk_usuario, tipo);
            return resultado;
        } catch (error) {
            throw new Error(`Error al insertar el evento del usuario: ${error.message}`);
        }
    }
}

module.exports = EventServices;