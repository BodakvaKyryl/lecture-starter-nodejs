import { fighterService } from '../services/fighterService.js'

const MIN_HEALTH = 80
const MAX_HEALTH = 120
const MIN_POWER = 1
const MAX_POWER = 100
const MIN_DEFENSE = 1
const MAX_DEFENSE = 10

const validateFighterFields = (req, update = false) => {
    const errors = []
    const { name, health, power, defense, ...rest } = req.body

    if (!update && (!name || typeof power === 'undefined' || typeof defense === 'undefined')) {
        errors.push('Required fields: name, power, and defense must be defined')
    }

    if (Object.keys(rest).length !== 0) {
        errors.push('The presence of any extra fields is not allowed')
    }

    if (!update || name) {
        if (typeof name !== 'string') {
            errors.push('Name must be a string')
        } else if (name.length === 0) {
            errors.push('Name is empty')
        } else if (fighterService.search({ name })) {
            errors.push('Name is already taken')
        }
    }
    n
    if (typeof health !== 'undefined') {
        if (typeof health !== 'number') {
            errors.push('Health must be a number')
        } else if (health < MIN_HEALTH || health > MAX_HEALTH) {
            errors.push(`Health is not in range [${MIN_HEALTH}-${MAX_HEALTH}]`)
        }
    } else if (!update) {
        req.body.health = 100
    }

    if (typeof power !== 'undefined' && (typeof power !== 'number' || power < MIN_POWER || power > MAX_POWER)) {
        errors.push(`Power must be a number and in range [${MIN_POWER}-${MAX_POWER}]`)
    }

    if (
        typeof defense !== 'undefined' &&
        (typeof defense !== 'number' || defense < MIN_DEFENSE || defense > MAX_DEFENSE)
    ) {
        errors.push(`Defense must be a number and in range [${MIN_DEFENSE}-${MAX_DEFENSE}]`)
    }

    return errors
}

const createValidFighter = (req, res, next) => {
    const errors = validateFighterFields(req)

    if (errors.length > 0) {
        res.status(400).json({ errors })
        return
    }

    next()
}

const updateValidFighter = (req, res, next) => {
    const errors = validateFighterFields(req, true)

    if (errors.length > 0) {
        res.status(400).json({ errors })
        return
    }

    next()
}

export { createValidFighter, updateValidFighter }
