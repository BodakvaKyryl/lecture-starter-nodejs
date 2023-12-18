const responseMiddleware = (req, res, next) => {
    const result = res.locals.queryResult
    res.send(result)
    next()
}

export { responseMiddleware }
