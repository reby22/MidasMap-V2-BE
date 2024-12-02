const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let tokenStorage = {}; // Temporal en memoria (usar una base de datos para producción)

const generateToken = (email) => {
    const token = crypto.randomBytes(16).toString('hex'); // Token único
    const expiresAt = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos

    tokenStorage[email] = { token, expiresAt };
    return { token, expiresAt };
};

const validateToken = (email, token) => {
    const storedTokenData = tokenStorage[email];

    if (!storedTokenData) {
        return { valid: false, reason: 'Token no encontrado o ya usado.' };
    }

    if (Date.now() > storedTokenData.expiresAt) {
        return { valid: false, reason: 'El token ha expirado.' };
    }

    if (storedTokenData.token !== token) {
        return { valid: false, reason: 'El token no es válido.' };
    }

    return { valid: true, reason: 'El token es válido.' };
};




const generateTokenByPasswordChange = (id_usuario) => {
    if (!id_usuario) {
        throw new Error('id_usuario son obligatorios para generar el token.');
    }

    const token = jwt.sign(
        { id_usuario:id_usuario },
        process.env.SECRET_KEY, // Llave secreta
        { expiresIn: '15m' } // El token expira en 15 minutos
    );
    return { token};
};

const verifyPasswordToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Token decodificado:', JSON.stringify(decoded, null, 2)); // Muestra el contenido real del objeto
        if (!decoded || !decoded.id_usuario) {
            throw new Error('Token no válido o incompleto.');
        }
        return decoded;
    } catch (error) {
        console.error('Error al verificar el token:', error);
        throw new Error('El token no es válido o ha expirado.');
    }
};


module.exports = { generateToken, validateToken, generateTokenByPasswordChange, verifyPasswordToken};
