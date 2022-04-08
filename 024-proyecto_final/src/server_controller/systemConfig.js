import { config } from '../config/config.js'

function systemConfig(req, res, next) {
    try {
        res.json(config)
    } catch (error) {
        next(error)
    }
}

export { systemConfig }