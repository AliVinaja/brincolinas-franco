import mongoose from 'mongoose';
import Usuario from '../features/users/Usuario';

// Conectar a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/brincolinas_franco', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

const agregarUsuario = async (userData) => {
    try {
        await connectDB();
        const usuario = new Usuario(userData);
        await usuario.save();
        console.log('Usuario agregado exitosamente');
        return usuario;
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
};

export default agregarUsuario;