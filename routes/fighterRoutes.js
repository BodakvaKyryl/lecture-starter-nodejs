import { Router } from 'express'
import { fighterService } from '../services/fighterService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import { createFighterValid, updateFighterValid } from '../middlewares/fighter.validation.middleware.js'

const router = Router()

router.get(
    '/',
    (req, res, next) => {
        try {
            const fighters = fighterService.getAll()
            res.json({ data: fighters })
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
            const fighter = fighterService.getOne(req.params.id)
            res.json({ data: fighter })
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
    createFighterValid,
    (req, res, next) => {
        try {
            res.json({ data: fighterService.create(req.body) })
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
    updateFighterValid,
    (req, res, next) => {
        try {
            res.json({ data: fighterService.update(req.params.id, req.body) })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.delete(
    '/:id',
    (req, res, next) => {
        try {
            const fighter = fighterService.delete(req.params.id)
            res.json({ data: fighter })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
        } finally {
            next()
        }
    },
    responseMiddleware
)

export { router }
