import FileContainer from '../../cointainers/FileContainer.js'

class MessageDAOFile extends FileContainer {
    constructor() {
         super('./data/messages.txt', 'utf-8')
    }

    async getMessagesByEmail(email) {
        const objects = await this.read()
        const messages = []

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].author == email ) {
                messages.push(objects[i])
            }
         }

        return messages
    }
}

export default MessageDAOFile