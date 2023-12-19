import { Router } from 'express'
import { fightersService } from '../services/fightService.js'
import { createUserValid, updateUserValid } from '../middlewares/user.validation.middleware.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.get(
    '/',
    (req, res, next) => {
        try {
            const fights = fightersService.getAll()
            res.data = fights
        } catch (err) {
            res.err = err
            res.err.status = 404
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.get(
    '/:id',
    (req, res, next) => {
        try {
            const fight = fightersService.getOne(req.params.id)

            res.data = fight
        } catch (err) {
            res.err = err
            res.err.status = 404
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.post(
    '/',
    (req, res, next) => {
        try {
            const { fighter1, fighter2 } = req.body
            res.data = fightersService.create({ fighter1, fighter2 })
        } catch (err) {
            res.err = err
            res.err.status = 400
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.put(
    '/:id',
    (req, res, next) => {
        try {
            const { log } = req.body
            res.data = fightersService.update(req.params.id, {
                log,
            })
        } catch (err) {
            res.err = err
            res.err.status = 400
        } finally {
            next()
        }
    },
    responseMiddleware
)

export { router }
