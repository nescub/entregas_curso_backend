const adminUser = false

function midValidateAdminUser(req, res, next){
    if(!adminUser){
        const newError = new Error('El usuario no esta autorizado para ejecutar esta operacion')
        newError.name = 'Forbidden'
        next(newError)
    }
    else {
        next()
    }
}

module.exports = midValidateAdminUser