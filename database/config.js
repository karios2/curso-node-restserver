const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true,
           // useFindAndModify: false
        });

        console.log('Base de datos OnLine');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de datos');
        
    }

}

//para esportar las funciones diversas
module.exports = {
    dbConnection
}

