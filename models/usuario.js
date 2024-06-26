const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
        
    },
    img: {
        type: String
              
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
              
    },
    estado: {
        type: Boolean,
        default: true
              
    },
    google: {
        type: Boolean,
        default: false
              
    },

});
//esta funcion quita los campos __v y password y el resto los almacena en variable usuario
UsuarioSchema.methods.toJSON = function(){
    const {__v,password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);

