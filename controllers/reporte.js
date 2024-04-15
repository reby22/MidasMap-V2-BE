const {Reporte} = require('../models/associations');

const create = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {titulo, descripcion, id_usuario, id_institucion, direccion, longitud, latitud, altitud, id_bsl, id_enfermedad, id_agente_causal, fecha_pid, fecha_upd, distribucion_sexo, duracion_promedio_incubacion, duracion_promedio_enfermedad, signos_sintomas, modo_transmision, numero_casos_sospechosos, numero_casos_probables, numero_casos_confirmados, numero_casos_totales, numero_casos_hospitalizados, numero_muertos, uci} = req.body;

      if(!titulo || !descripcion || !id_usuario || !id_institucion ||  !direccion || !longitud || !latitud || !altitud || !id_bsl || ! id_enfermedad || ! id_agente_causal || ! fecha_pid || !fecha_upd || !distribucion_sexo || !duracion_promedio_incubacion || !duracion_promedio_enfermedad|| ! signos_sintomas|| ! modo_transmision|| ! numero_casos_sospechosos|| ! numero_casos_probables || !numero_casos_confirmados || !numero_casos_totales || !numero_casos_hospitalizados || !numero_muertos || !uci){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevo = await Reporte.create({
        titulo, 
        descripcion, 
        id_usuario, 
        id_institucion, 
        direccion, 
        longitud, 
        latitud, 
        altitud, 
        id_bsl, 
        id_enfermedad, 
        id_agente_causal, 
        fecha_pid, fecha_upd, 
        distribucion_sexo, 
        duracion_promedio_incubacion, 
        duracion_promedio_enfermedad, 
        signos_sintomas, 
        modo_transmision, 
        numero_casos_sospechosos, 
        numero_casos_probables, 
        numero_casos_confirmados, 
        numero_casos_totales, 
        numero_casos_hospitalizados, 
        numero_muertos, 
        uci
      });

      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Reporte: nuevo});
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Reporte.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        res.status(200).json({ aux });
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    create,
    getById
};
 