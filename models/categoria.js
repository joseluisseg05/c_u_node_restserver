const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    creado_por: { // saber que usuario lo creo
        type: Schema.Types.ObjectId, //el tipo de dato
        ref: 'Usuario', // la referencia del documento que apunta
        required: true
    }
});

CategoriaSchema.methods.toJSON = function () { 
    const {__v, estado, ...categoria} = this.toObject(); 
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);