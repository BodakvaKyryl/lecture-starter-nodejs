import { Router, json } from 'express'
import { fightersService } from '../services/fightService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.get(
    '/',
    (req, res, next) => {
        try {
            const fights = fightersService.getAll()
            res.json({ data: fights })
        } catch (err) {
            res.status(404).json({ error: true, message: err.message })
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

            res.json({ data: fight })
        } catch (err) {
            res.status(404).json({ error: true, message: err.message })
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
            res.json({ data: fightersService.create({ fighter1, fighter2 }) })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
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
            res.json({ data: fightersService.update(req.params.id, { log }) })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
        } finally {
            next()
        }
    },
    responseMiddleware
)

export { router }
