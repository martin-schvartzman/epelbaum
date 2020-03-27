const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    user_id:Schema.Types.ObjectId,

    mediacion_carpeta_mediacion:String,
    mediacion_carpeta_siniestro:String,
    mediacion_fecha_alta:String,
    mediacion_fecha_recepcion:String,

    cliente_nombre_completo:String,
    cliente_productor:String,
    cliente_telefono:String,
    cliente_fecha_siniestro:String,
    cliente_patente:String,
    cliente_marca:String,
    cliente_presupuesto:String,
    cliente_asegurado:String,
    cliente_franquicia:String,
    cliente_lesiones:String,
    cliente_lesionado:String,

    terceros_nombre_completo:String,
    terceros_siniestro:String,
    terceros_domicilio:String,
    terceros_telefono:String,
    terceros_dni:String,
    terceros_seguro:String,
    terceros_poliza:String,
    terceros_notificacion:String,
    terceros_patente:String,
    terceros_marca:String,
    terceros_cita:String,

    adicionales_fecha_audiencia:String,
    adicionales_horario:String,
    adicionales_se_avisa:String,
    adicionales_observaciones:String

});

module.exports = mongoose.model('Case',schema);