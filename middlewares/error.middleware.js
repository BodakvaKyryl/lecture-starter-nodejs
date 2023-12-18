import CustomError from '../services/errorService.js'

export const errorHandler = async (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            error: true,
            message: err.message,
        })
    }
    return res.status(500).json({
        error: true,
        message: err,
    })
}
