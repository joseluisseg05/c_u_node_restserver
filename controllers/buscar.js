const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
    'prod_cate'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid(termino);
    if (isIdMongo ) {
        const usuario = await Usuario.findById(termino, { estado: true });
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    } 

    const exp_reg = new RegExp (termino, 'i'); //expresion regular de js para no sencible 
    const usuarios = await Usuario.find({ 
        $or:[ 
            {nombre: exp_reg}, 
            {correo: exp_reg}  
        ], //$or es propio de mongo
        $and: [
            {estado: true}
        ]
    });

    res.json({
        results: usuarios
    })
};

const buscarProductos = async(termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid(termino);
    if ( isIdMongo ) {
        //const produto = await Producto.findById(termino, { estado: true });
        return res.json({
            results: (produto) ? [produto] : []
        })
    } 

    const exp_reg = new RegExp (termino, 'i'); //expresion regular de js para no sencible 
    const produtos = await Producto.find({ nombre:exp_reg, estado: true});

    res.json({
        results: produtos
    })
};

const buscarProductosByCategoria = async(termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid(termino);
    if ( isIdMongo ) {
        //const produto = await Producto.findById(termino, { estado: true });
        const produto = await Producto.find({categoria: termino}); // todos los productos de una categoria
        return res.json({
            results: (produto) ? [produto] : []
        })
    } 

    const exp_reg = new RegExp (termino, 'i'); //expresion regular de js para no sencible 
    const produtos = await Producto.find({ nombre:exp_reg, estado: true});

    res.json({
        results: produtos
    })
};

const buscarCategorias = async(termino = '', res = response) => {

    const isIdMongo = ObjectId.isValid(termino);
    if ( isIdMongo ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    } 

    const exp_reg = new RegExp (termino, 'i'); //expresion regular de js para no sencible 
    const categorias = await Categoria.find({ nombre:exp_reg, estado: true });

    res.json({
        results: categorias
    })
};



const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) )
        return res.status(400).json({
            msj: `No se encontro una coleccion con el nombre ${coleccion}`
        })
    
    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);            
        break;

        case 'productos':
            buscarProductos(termino, res);
        break;

        case 'usuarios':
            buscarUsuarios(termino, res);
        break;

        case 'prod_cate':
            buscarProductosByCategoria(termino, res);
        break;
    
        default:
            res.status(500).json({
                msj: "Falta la implementacion de esta busqueda.."
            })
        break;
    }
    
}


module.exports = {
    buscar,
    
}