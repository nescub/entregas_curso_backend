import FileContainer from '../../cointainers/FileContainer.js'

class UserDAOFile extends FileContainer {
    constructor() {
         super('./data/users.txt', 'utf-8')
    }

    async getUserByEmail(email)  {
        const objects = await this.read()

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].email == email) {
                return objects[i]
            }

        }

        return null
    }

    async getUser(usuario) {
        const objects = await this.read()

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].usuario == usuario) {
                return objects[i]
            }

        }

        return null
    }

    async deleteUser(usuario) {
        const objects = await this.read()
        
        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].usuario == usuario) {
                const eliminated = objects.splice(i, 1)
                await this.write(objects)
                return eliminated[0]
            }
        }
        
        return null
    }
}

export default UserDAOFile