const supabase = require('../configs/supabase');

class EventRepository {
    getEventosDeUsuario = async (id = 1) => {
        try {
            const { data, error } = await supabase
                .from('evento')
                .select('*')
                .eq('fk_usuario', id);

            if (error) {
                throw new Error(error.message);
            }
            return data;
        } catch (error) {
            console.error(`Error en getEventosDeUsuario: ${error.message}`);
        }
    }

    postEvento = async (titulo, fecha, horaInicio, horaFin, color, isAllDay, descripcion, fk_usuario, tipo) => {
        let response = {}

        try {
            const { data, error, status } = await supabase
                .from('evento')
                .insert([
                    {
                        titulo: titulo,
                        fecha: fecha,
                        horaInicio: horaInicio,
                        horaFin: horaFin,
                        color: color,
                        isAllDay: isAllDay,
                        descripcion: descripcion,
                        fk_usuario: fk_usuario,
                        tipo: tipo
                    }
                ])
            if (error) {
                throw new Error(error.message);
            }

            if(status == 201) response.sucess = true

            return response;
        } catch (error) {
            console.error(`Error en postEvento: ${error}`);
            return response
        }
    }

}
module.exports = EventRepository;