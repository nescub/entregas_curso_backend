function getErrorDetail(err, req, res) {
    if (Object.keys(err).includes('name')) {
        if (err.name == 'Bad Request') {
            return { error: 400, type: err.name, description: `${err.message} - Ruta ${req.url} metodo ${req.method} no autorizada` }
        }
        else if (err.name == 'NotAuthenticated') {
            return { error: 401, type: err.name, description: err.message }
        } 
        else if ((err.name == 'Forbidden') || ( err.name == 'NotAuthorized')) {
            return { error: 403, type: err.name, description: err.message }
        } 
        else if (err.name == 'NotFound') {
            return { error: 404, type: err.name, description: err.message }
        } 
    }
    
    return { error: 500, type: 'Internal Error', description: err.message }
}

export { getErrorDetail }