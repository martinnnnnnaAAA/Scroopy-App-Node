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
        let response = {};

        try {
            // Inicializar un array para recoger los parámetros faltantes
            const missingParams = [];

            // Verificar cada parámetro y añadir el nombre del parámetro faltante al array si está vacío
            if (!titulo) missingParams.push('titulo');
            if (!fecha) missingParams.push('fecha');
            if (!horaInicio) missingParams.push('horaInicio');
            if (!horaFin) missingParams.push('horaFin');
            if (!color) missingParams.push('color');
            if (!descripcion) missingParams.push('descripcion');
            if (!fk_usuario) missingParams.push('fk_usuario');
            if (!tipo) missingParams.push('tipo');

            // Si hay parámetros faltantes, lanzar un error con los nombres de los parámetros faltantes
            if (missingParams.length > 0) {
                throw new Error(`Parámetros vacíos o no definidos: ${missingParams.join(', ')}`);
            }

            // Insertar el evento en Supabase
            const { data, error, status } = await supabase
                .from('evento')
                .insert([
                    {
                        titulo,
                        fecha,
                        horaInicio,
                        horaFin,
                        color,
                        isAllDay,
                        descripcion,
                        fk_usuario,
                        tipo
                    }
                ]);

            // Manejar errores
            if (error) {
                throw new Error(error.message);
            }

            // Configurar respuesta exitosa
            if (status === 201) {
                response.success = true;
                response.data = data; // Incluir datos de respuesta si es necesario
            } else {
                response.success = false;
                response.message = `Unexpected status code: ${status}`;
            }

        } catch (error) {
            console.error(`Error en postEvento: ${error.message}`);
            response.success = false;
            response.message = `Error en la inserción del evento: ${error.message}`;
        }

        return response;
    }

}
module.exports = EventRepository;