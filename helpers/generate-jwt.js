const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:60*60
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token')
            }
            else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJwt
}