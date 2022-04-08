import MemoryContainer from  '../../cointainers/MemoryContainer.js'

class MessageDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }

    getMessagesByEmail(email) {
        const messages = []

        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).author == email ) {
                messages.push(this.objects[i])
            }
         }

        return messages
    }
}

export default MessageDAOMemory