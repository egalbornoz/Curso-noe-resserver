const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        //Conexión a la db
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos ONLINE')
    } catch (error) {
        console.log(error)
        throw new Error('Error inicializando la DB');
    }
}

module.exports = {
    dbConnection,
}