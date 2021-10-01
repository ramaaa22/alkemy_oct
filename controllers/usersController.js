const { User } = require('../models');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { generateJwt } = require('../helpers/generate-jwt');

const controller = {
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const hash_password = bcrypt.hashSync(password, 10);
            const user = {
                email,
                password: hash_password
            }
            const new_user = await User.create(user);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: email, 
                from: 'ramiro.boza@hotmail.com', 
                subject: 'Bienvenido a Alkemy',
                text: 'Ya podés iniciar sesión con tu nombre de usuario y contraseña',
                html: '<p>Ya Podes iniciar sesión con tu nombre de usuario y contraseña</p><br><strong>Alkemy.org</strong>',
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            return res.send(new_user);
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({where:{email:email}});
            if (!user) {
                return res.status(400).json({
                    msg: 'Usuario invalido'
                })
            }
            let password_ok=bcrypt.compareSync(password, user.password);
            if (password_ok) {
                const token = await generateJwt(user._id)
                res.json({
                    msg: 'ok',
                    token
                })
            }
            else {
                res.json({
                    msg: 'Contraseña incorrecta'
                })
            }
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
}

module.exports = controller;