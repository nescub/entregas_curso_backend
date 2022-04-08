/* Formato del objeto user:
    {
        id: number,              -> atributo agregado por el container
        usuario: string,
        password: string,
        nombre: string,
        apellido: string,
        direccion: string,
        email: string,
        admin: boolean
    }
*/

import { createUserDAO } from '../persistence/daos/createDAO.js'
import bCrypt from 'bcrypt'
import EmailManager from './EmailManager.js'
import { config } from '../config/config.js'

class UserManager {
    constructor() {
        this.userDAO = createUserDAO()
        this.emailManager = new EmailManager()
    }

    async initialize() {
        await this.userDAO.connect()
    }

    static get userKeys() {
        return [ 'usuario', 'password', 'nombre', 'apellido', 'direccion', 'email', 'admin' ]
    }
    
    static get userKeysString() {
        return [ 'usuario', 'password', 'nombre', 'apellido', 'direccion', 'email' ]
    }

    static get userKeysBoolean() { 
        return [ 'admin' ]
    }

    async getUserByEmail(email) {
        const userGetted = await this.userDAO.getUserByEmail(email)
        this.validateUserGetted(userGetted, `No existe con email ${email}`)
        return userGetted
    }

    async getUserById(id) {
        const userGetted = await this.userDAO.getById(id)
        this.validateUserGetted(userGetted, `No existe un usuario con id igual a ${id}`)
        return userGetted
    }
    
    async getUser(usuario) {
        const userGetted = await this.userDAO.getUser(usuario)
        this.validateUserGetted(userGetted, `No existe el usuario ${usuario}`)
        return userGetted
    }

    async createUser(newUser) {
        await this.validateNewUser(newUser)
        newUser.password = this.createHash(newUser.password)
        const userInserted = await this.userDAO.save(newUser)

        delete userInserted.password

        this.notifyNewUser(userInserted)

        return userInserted   
    }

    async deleteUser(usuario){
        const userDeleted = await this.userDAO.deleteUser(usuario)
        this.validateUserGetted(userDeleted, `No existe el usuario ${usuario}`)
        return userDeleted
    }

    isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password)
      }
    
    createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }
    
    async validateNewUser(newUser) {
        UserManager.userKeys.forEach(function(element, index, array){
            if(!(Object.keys(newUser).includes(element))){
                throw new Error(`Atributo con nombre ${element} no definido`)
            }
        })
        
        for (const property in newUser) {
            if(!(UserManager.userKeys.includes(property))){
                throw new Error(`Un usuario no puede tener un atributo con nombre ${property}`)
            }
            
            if ((UserManager.userKeysString.includes(property)) && (!((typeof newUser[property] == 'string') && (newUser[property].length != 0)))) {
                throw new Error(`El atributo ${property} debe ser un string no vacio`) 
            }

            if ((UserManager.userKeysBoolean.includes(property)) && (typeof newUser[property] != 'boolean')) {
                throw new Error(`El atributo ${property} debe ser un booleano`)     
            }
        }

        if ((await this.userDAO.getUser(newUser.usuario)) != null) {
            throw new Error(`Ya existe el usuario ${newUser.usuario}`)     
        }
    }

    validateUserGetted(userGetted, errorMessage) {
        if (userGetted == null) {
            const newError = new Error(errorMessage)
            newError.name = 'NotFound'
            throw newError
        }
    }

    notifyNewUser(newUser) {
        delete newUser.password

        const to = config.EMAIL_ADDRESS_NOTIFICATION_USER
        const subject = `Se crea usuario id: ${newUser.id}`
        const text = `Se crea usuario:\n${JSON.stringify(newUser, null, 2)}`

        this.emailManager.sendMail(this.emailManager.createMailDataText(to, subject, text))
    }
}

export default UserManager