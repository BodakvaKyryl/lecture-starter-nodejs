import { response } from 'express'

const responseMiddleware = (req, res, next) => {
    if (res.err) {
        const statusErr = res.err.status || 400
        const response = (message) => {
            return { error: true, message }
        }
        res.status(statusErr).send(response(res.err.message))
    } else {
        res.status(200).send(res.data)
    }
    next()
}

export { responseMiddleware }
