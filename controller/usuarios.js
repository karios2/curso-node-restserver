const mongoose = require('mongoose');
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {
    // const {q,nombre = 'no envia',apikey} = req.query;
    const {limite=5, desde = 0} = req.query; // indicamos que vamos ha recibir un parametro: limite,con volor por defecto 5
    const query = {estado:true};
    const [total,usuarios] = await Promise.all([
         Usuario.countDocuments(query), //retorna total
         Usuario.find(query) //retorna los usuarios
         .skip(Number(desde))
         .limit(Number(limite))
    ]);
    res.json({
         total,
         usuarios
     });
    //encuentra desde al limite registros de la DB
    /* const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite)); 
     const total = await Usuario.countDocuments(query); */
    
 }
 
 

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: 'El id no es válido'
        });
    }

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'put API - controller',
        usuario
    });
};

const usuariosPost = async (req, res = response) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - controller',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    //borrado fisico.
    //const usuario = await Usuario.findByIdAndDelete(id);
    //borrado logico:
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
       usuario
    });
}




const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};
