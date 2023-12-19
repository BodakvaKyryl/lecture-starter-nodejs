import { Router } from 'express'
import { authService } from '../services/authService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.post(
    '/login',
    (req, res, next) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                throw new Error('Missing required fields')
            }

            const data = authService.login({ email, password })
            res.data = data
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
