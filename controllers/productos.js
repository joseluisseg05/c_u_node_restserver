const { response } = require('express');

const { Producto } = require('../models');

const crear = async ( req, res = response ) => {
    const { estado, ...body } = req.body;

    body.nombre = body.nombre.toUpperCase(); // formatea primero el atributo
    //nombre para realizar la validacion

    const storedProc = await Producto.findOne({nombre:body.nombre});
    
    if ( storedProc )
        return res.status(400).json({
            msj: `El producto ${body.nombre} ya existe`
        });
    
    const data = { 
        ...body,
        creado_por : req.usuario._id
    };

    //al pasarlo por el modelo se formatea y deja fuera 
    //los datos que viene de mas 
    //const producto = new Producto(data); 
    //await producto.save();

    const producto = await Producto.create(data); // es lo mismo que las dos 
    //lineas anteriores y tambien lo formatea

    res.status(201).json({
        producto
    })
    
};

const obtenerAll = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
        //primer campo es el del referencia y el segundo es el de que campo va a traer
            .populate('categoria', 'nombre')
            .populate('creado_por', 'nombre')
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    })
};

const obtenerById = async ( req, res = response ) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('categoria', 'nombre')
        .populate('creado_por', 'nombre');

    res.json({
        producto
    })
};

const actualizar = async ( req, res = response ) => {
    const { id } = req.params;
    const { estado, creado_por, ...data} = req.body;

    if( data.nombre ) // si viene el nombre lo convierte en mayusculas
        data.nombre = data.nombre.toUpperCase();
    
    data.creado_por = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.json({
        producto
    })
};

const eliminar = async ( req, res = response ) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado:false});

    res.json({
        producto
    })
};

module.exports = {
    crear,
    obtenerAll,
    obtenerById,
    actualizar,
    eliminar

}
