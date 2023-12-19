import { Router } from 'express'
import { userService } from '../services/userService.js'
import { createUserValid, updateUserValid } from '../middlewares/user.validation.middleware.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.get(
    '/',
    (req, res, next) => {
        try {
            res.json({ data: userService.getAll() })
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
            res.json({ data: userService.getOne(req.params.id) })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
        } finally {
            next()
        }
    },
    responseMiddleware
)

router.post(
    '/',
    createUserValid,
    (req, res, next) => {
        try {
            res.json({ data: userService.create(req.body) })
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
    updateUserValid,
    (req, res, next) => {
        try {
            res.json({ data: userService.update(req.params.id, req.body) })
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
            res.json({ data: userService.delete(req.params.id) })
        } catch (err) {
            res.status(400).json({ error: true, message: err.message })
        } finally {
            next()
        }
    },
    responseMiddleware
)

export { router }
