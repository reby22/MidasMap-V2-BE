const jwt = require("jsonwebtoken");

// Generamos un token a partir de la id del usuario con una llave secreta, es una cadena propia
// La validación es de 4 horas
// Si el error tiene valor es que hay un error
const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        // const payload = { id };
        console.log(user);
        const payload = { userId: user.id_usuario, role: user.id_rol };
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "4h" }, (error, token) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
}

const verifyToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        // Verificar el token
        const verified = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); // 'Bearer <token>'
        req.user = verified;  // Guardar la información decodificada del usuario en req.user
        next();  // Pasar al siguiente middleware o a la ruta final
    } catch (err) {
        res.status(401).json({ message: 'Token no válido.' });
    }
};

// Middleware para verificar el rol del usuario
const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const { role } = req.user;  // `req.user` viene del token JWT verificado en `verifyToken`

        // Verifica si el rol del usuario está en los roles permitidos
        if (!rolesPermitidos.includes(role)) {
            return res.status(403).json({ message: 'No tienes los permisos necesarios para acceder a esta ruta.' });
        }

        next();  // Si el rol es permitido, continúa con la ruta
    };
};


module.exports = {
    generateJWT,
    verifyToken,
    checkRole
}