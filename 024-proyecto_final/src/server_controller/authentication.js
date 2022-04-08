import jwt from 'jsonwebtoken'
import UserManager from '../business/UserManager.js'
import { config } from '../config/config.js'

const PRIVATE_KEY = "1a2b3c4d5e6f7g8h9i"

const userManager = new UserManager()
await userManager.initialize()

function generateToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: config.TOKEN_EXPIRES_IN_SECONDS })
    return token
}

function throwUnauthenticatedError(){
    const newError = new Error('Usuario no autenticado')
    newError.name = 'NotAuthenticated'
    throw newError
}

function throwUnauthorizedError(errorDescription){
    const newError = new Error(errorDescription)
    newError.name = 'NotAuthorized'
    throw newError
}

async function accessToken(req, res, next) {
    try {
        const { email, password } = req.body
  
        const user = await userManager.getUserByEmail(email)
        
        if (!user) {
            throwUnauthorizedError('Usuario-Password invalidos')
        }

        if (!userManager.isValidPassword(user, password)) {
            throwUnauthorizedError('Usuario-Password invalidos')
        }

        const access_token = generateToken(user)

        res.json({ access_token })
    } catch (error) {
        next(error)
    }
}

function authentication(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        throwUnauthenticatedError()
    }

    const authHeaderValues = authHeader.split(' ')

    if((authHeaderValues.length < 2) || (authHeaderValues[0] != 'Bearer') ) {
        throwUnauthenticatedError()
    }

    const token = authHeaderValues[1]
  
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        throwUnauthorizedError('Usuario no autorizado')
      }
  
      req.user = decoded.data
      next()
    })
  }

  export { accessToken, authentication }