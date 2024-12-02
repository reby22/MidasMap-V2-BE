const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const handlebars = require('handlebars');
const { Usuario, Titulo, Rol } = require('../models/associations');
const { generateTokenByPasswordChange, validateToken, generateToken, verifyPasswordToken } = require('../helpers/emailTokens');

// Configuración del transporter

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    },
});


// Función para compilar templates HTML
const compileTemplate = (template_name, data) => {
    const file_path = path.join(__dirname, `../templates/${template_name}`);
    const source = fs.readFileSync(file_path, 'utf8');
    const template = handlebars.compile(source); // Compila el template
    return template(data); // Inserta los datos dinámicos
};

// Función para enviar correos
const sendEmail = async (to, subject, template_name, data) => {
    try {
        const html_content = compileTemplate(template_name, data);

        const info = await transporter.sendMail({
            from: `"MIDASmap" <${process.env.EMAIL}>`,
            to,
            subject,
            html: html_content, // Usa el contenido procesado
        });

        console.log('Correo enviado: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

const sendEmail2 = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({
            from: `"Tu Proyecto" <${process.env.EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        });
        console.log('Correo enviado: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

//////////////////////////////

//ejemplo: 
const sendEmailController = async (req, res) => {
    const { to, subject, templateName, data } = req.body;

    try {
        await sendEmail(to, subject, templateName, data);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};

//PARA VERIFICAR CORREO:
// Función 1: Enviar un correo con un token nuevo
const sendVerificationEmail = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'El correo es obligatorio.' });
    }
    try {
        const { token, expiresAt } = generateToken(correo);
        const data = {
            token: token,
            expiresAt: "15"
        };

        await sendEmail(correo, 'Verificación de correo', "sendVerificationEmailTemplate.html", data);

        res.status(200).json({
            message: 'Token enviado al correo.',
            expiresAt,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo.' });
    }
};

//Funcion 2: verifica que el  token escrito por el usuario es el mismo que el ultimo enviado
const verifyToken = async (req, res) => {
    const { correo, token } = req.body;

    if (!correo || !token) {
        return res.status(400).json({ error: 'El correo y el token son obligatorios.' });
    }

    const validation = validateToken(correo, token);

    if (!validation.valid) {
        return res.status(400).json({ error: validation.reason });
    }

    res.status(200).json({ message: validation.reason });
};



/*PARA MANDAR TERMINOS Y CONDICIONES Y DE QUE FUE ACEPTADO:
 1 . le manda el correo DE QUE FUE ACEPTADO Y LINK DE LA PAG */

const sendConfirmationEmail = async(nombre, apellido, id_titulo, correo, id_rol ) => {
    try {
        const titulo = await Titulo.findByPk(id_titulo);
        const rol = await Rol.findByPk(id_rol);

        const data = {
            nombre: titulo + " "+ nombre + " "+ apellido,
            rol: rol,
            url: process.env.HOME_URL
        };
        await sendEmail(correo, "Bienvenido a MIDASmap", "confirmationEmailTemplate.html", data);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};


/*FUNCION PARA OLVIDO DE CONTRASEÑA
1  Funcion 1: ingresa correo
Caso 1 el correo no esta en la base de datos -> mandar error de que no esta en base de datos
Caso 2, si esta en la base de datos: Le manda un correo el link para cambiar contraseña, tipo html/nuevacontrsaeña/1234454
2. Fucnion 2: Le mandan los 2 correos 
*/
const forgotPassword = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'El correo es obligatorio.' });
    }

    try {
        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(404).json({ error: 'El correo no está ligado a ningún usuario.' });
        }
        // Genera el token incluyendo el ID del usuario
        const { token } = generateTokenByPasswordChange(user.id_usuario);
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const data = {
            username: user.nombre,
            url: resetLink,
            expiresAt: "15",
        };

        // Envía el correo
        await sendEmail(correo, 'Restablecimiento de Contraseña', 'forgotPasswordTemplate.html', data);
        res.status(200).json({
            message: 'Correo enviado con el enlace para restablecer la contraseña.',
        });
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};



const changePassword = async (req, res) => {
    const { token, nueva_contraseña } = req.body;

    try {
        if (!token || !nueva_contraseña) {
            return res.status(400).json({ msg: 'Faltan datos' });
        }

        // Decodifica el token
        const decoded = await verifyPasswordToken(token); // Asegúrate de usar await
        console.log("decoded:", decoded); // Verifica que el objeto es correcto
        const { id_usuario } = decoded;

        if (!id_usuario) {
            return res.status(400).json({ error: 'El token no contiene un id_usuario válido.' });
        }

        // Busca al usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { id_usuario } });
        if (!usuario) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // Encripta la nueva contraseña
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(nueva_contraseña, saltRounds);

        // Actualiza la contraseña
        await Usuario.update(
            { contraseña: hashed_password },
            { where: { id_usuario } }
        );

        res.status(200).json({ msg: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
};


module.exports = { changePassword, sendEmailController, forgotPassword, sendConfirmationEmail, sendVerificationEmail, verifyToken };






