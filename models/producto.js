const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean, 
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }, 
    img: {
        type: String
    },
    creado_por: { // saber que usuario lo creo
        type: Schema.Types.ObjectId, //el tipo de dato
        ref: 'Usuario', // la referencia del documento que apunta
        required: true
    }

});

ProductoSchema.methods.toJSON = function () { 
    const {__v, estado, ...data} = this.toObject(); 
    return data;
}


module.exports = model('Producto', ProductoSchema);