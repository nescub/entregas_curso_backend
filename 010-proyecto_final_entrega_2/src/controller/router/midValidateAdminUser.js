import { getSystemConfigurationParameters } from '../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()

function midValidateAdminUser(req, res, next) {

    if(!parameters.ADMIN_USER) {
        const newError = new Error('El usuario no esta autorizado para ejecutar esta operacion')
        newError.name = 'Forbidden'
        next(newError)
    }
    else {
        next()
    }
}

export { midValidateAdminUser }