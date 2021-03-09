const { response, request } = require('express');

const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if ( categoriaDB )
        return res.status(400).json({
            msj: `La categoria ${nombre} ya existe`
        });

    const data = {
        nombre,
        creado_por: req.usuario._id
    };

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        categoria
    })
};

//paginado, total, populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        //primer campo es el del referencia y el segundo es el de que campo va a traer
            .populate('creado_por', 'nombre')
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    })
};

//populate
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('creado_por', 'nombre');

    res.json({
        categoria
    });
};

//solo nombre
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, creado_por, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.creado_por = req.usuario._id; //obtiene el id del token de la persona que esta en el sistema 

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        categoria
    });
};

const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});

    res.json({
        categoria
    });
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}