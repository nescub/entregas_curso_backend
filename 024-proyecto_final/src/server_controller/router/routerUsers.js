// Creo el router usuarios

import { Router } from 'express'
import UserManager from '../../business/UserManager.js'

import { authentication } from '../authentication.js'
import { validateAdminUser } from '../validateAdminUser.js'

const routerUsers = Router()
const userManager = new UserManager()

await userManager.initialize()

routerUsers.get('/:usuario', authentication, async (req, res, next) => {
    try {
        res.json(await userManager.getUser(req.params.usuario))
    } catch (error) {
        next(error)
    }
})

routerUsers.post('/', async (req, res, next) => {
    try {
        res.json(await userManager.createUser(req.body))
    } catch (error) {
        next(error)
    }
})

routerUsers.delete('/:usuario', authentication, validateAdminUser, async (req, res, next) => {
    try {
        res.json(await userManager.deleteUser(req.params.usuario))
    } catch (error) {
        next(error)
    }
})

export { routerUsers }