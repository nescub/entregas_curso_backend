function validateAdminUser(req, res, next) {

    if(!req.user.admin) {
        const newError = new Error('El usuario no esta autorizado para ejecutar esta operacion')
        newError.name = 'Forbidden'
        next(newError)
    }
    else {
        next()
    }
}

export { validateAdminUser }