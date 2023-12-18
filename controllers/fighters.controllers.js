import { fighterService } from '../services/fighterService.js'

export const getAllFightersController = (req, res, next) => {
    const fighters = fighterService.getAllFighters()
    res.locals.queryResult = fighters
    next()
}

export const createFighterController = (req, res, next) => {
    const fighterDetails = req.body
    const fighter = fighterService.createFighter(fighterDetails)
    res.locals.queryResult = fighter
    next()
}

export const updateFighterController = (req, res, next) => {
    const id = req.params.id
    const data = req.body
    const patchedFighter = fighterService.updateFighter(id, data)
    res.locals.queryResult = patchedFighter
    next()
}

export const deletedFighterController = (req, res, next) => {
    const id = req.params.id
    const deletedFighter = fighterService.deleteFighter(id)
    res.locals.queryResult = deletedFighter
    next()
}

export const getFighterByIdController = (req, res, next) => {
    const id = req.params
    const fighter = fighterService.search(id)
    res.locals.queryResult = fighter
    next()
}
