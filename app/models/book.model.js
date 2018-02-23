var mongoose = require('mongoose');

// Creamos un schema que guardará en nuestra BD
// la siguiente estructura:
var BookSchema = mongoose.Schema({
    libro: String,
    autor: String,
    fecha: Date,
    nro_paginas: Number,
    fecha_entrega: Date,
},{
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);
