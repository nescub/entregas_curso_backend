import MemoryContainer from  '../../cointainers/MemoryContainer.js'

class UserDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }

    getUserByEmail(email) {
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).email == email ) {
               return this.objects[i]
            }
         }

        return null
    }

    getUser(usuario) {
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).usuario == usuario ) {
               return this.objects[i]
            }
         }

        return null
    }

    deleteUser(usuario) {
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).usuario == usuario ) {
               const eliminated = this.objects.splice(i, 1)
               return eliminated[0]
            }
         }

        return null
    }
}

export default UserDAOMemory


