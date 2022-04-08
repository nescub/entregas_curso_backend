/* Formato del objeto message:
    {
        id: number              -> atributo agregado por el container
        author: string,         -> direccion de correo electronico
        text: string,
        dateTime: string
    }
*/

import { createMessageDAO } from '../persistence/daos/createDAO.js'

class MessageManager {
    constructor() {
        this.messageDAO = createMessageDAO()
    }

    async initialize() {
        await this.messageDAO.connect()
    }

    static get messageKeys() {
        return [ 'author', 'text' ]
    }

    static get emailAddressKey() {
        return 'author'
    }
    
    async getAllMessages() {
        return await this.messageDAO.getAll()
    }

    async getMessagesByEmail(email) {
        const messages = await this.messageDAO.getMessagesByEmail(email)

        if (messages.length == 0) {
            const newError = new Error(`No existen mensajes asociados al email ${email}`)
            newError.name = 'NotFound'
            throw newError
        }

        return messages
    }

    async insertMessage(newMessage) {
        this.validateNewMessage(newMessage)
        newMessage.dateTime = new Date().toLocaleString()
        return await this.messageDAO.save(newMessage)   
    }

    async deleteAllMessages(){
        return await this.messageDAO.deleteAll()   
    }

    validateNewMessage(newMessage) {
        this.validateProperty(newMessage)
        this.validateEmailAddress(newMessage[MessageManager.emailAddressKey]) 
    }

    validateProperty(newMessage){
        MessageManager.messageKeys.forEach(function(element, index, array){
            if(!(Object.keys(newMessage).includes(element))){
                throw new Error(`Atributo con nombre ${element} no definido`)
            }
        })
        
        for (const property in newMessage) {
            if(!(MessageManager.messageKeys.includes(property))){
                throw new Error(`Un mensaje no puede tener un atributo con nombre ${property}`)
            }

            if ((MessageManager.messageKeys.includes(property)) && (!((typeof newMessage[property] == 'string') && (newMessage[property].length != 0)))) {
                throw new Error(`El atributo ${property} debe ser un string no vacio`) 
            }
        }
    }

    validateEmailAddress(emailAddress) {
        try {
            const emailAddressParts = emailAddress.split('@')
        
            if( emailAddressParts.length != 2 ) {
                throw new Error('Error al validar caracter arroba en la direccion de correo electronico') 
            } else {
                const emailAddressDomainParts = emailAddressParts[1].split('.')
            
                if (( emailAddressDomainParts.length < 2 ) || (!(emailAddressDomainParts.includes('com')))) {
                    throw new Error('El dominio de la direccion de correo electronico es invalido') 
                } 
            
            }
        } catch (error) {
            throw new Error(`Direccion de correo electronico invalida`)
        }
    }
}

export default MessageManager

