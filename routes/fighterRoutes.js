import { Router } from 'express'
import { fighterService } from '../services/fighterService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import { createFighterValid, updateFighterValid } from '../middlewares/fighter.validation.middleware.js'

const router = Router()

router.get(
    '/',
    (req, res) => {
        try {
            const fighters = fighterService.getAll()
            res.data = fighters
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
            const fighter = fighterService.getOne(req.params.id)
            res.data = fighter
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
    createFighterValid,
    (req, res, next) => {
        try {
            if (!res.err) {
                res.data = fighterService.create(req.body)
            }
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
    updateFighterValid,
    (req, res, next) => {
        try {
            if (!res.err) {
                res.data = fighterService.update(req.params.id, req.body)
            }
        } catch (err) {
            res.err = err
            res.err.status = 400
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
            res.data = fighter
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
