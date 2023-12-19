import { fighterRepository } from '../repositories/fighterRepository.js'
import { FIGHTER } from '../models/fighter.js'

class FighterService {
    search(data) {
        const item = fighterRepository.getOne(data)
        if (!item) {
            return null
        }
        return item
    }

    getAll() {
        const items = fighterRepository.getAll()
        if (!items) {
            return null
        }
        return items
    }

    getOne(id) {
        try {
            const item = fighterRepository.getOne({ id })
            if (!item) {
                throw Error('Fighter not found')
            }
            return item
        } catch (error) {
            throw Error('Fighter not found')
        }
    }

    create(data) {
        const validFighter = {}
        for (let key in data) {
            if (key in FIGHTER && key !== 'id') {
                validFighter[key] = data[key]
            }
        }
        try {
            const item = fighterRepository.create(validFighter)
            if (!item) {
                throw Error('Fighter not created')
            }
            return item
        } catch (error) {
            throw Error('Fighter not created')
        }
    }

    update(id, data) {
        const validFighter = {}
        for (let key in data) {
            if (key in FIGHTER && key !== 'id') {
                validFighter[key] = data[key]
            }
        }
        try {
            const item = fighterRepository.update(id, validFighter)
            if (!item) {
                throw Error('Fighter not updated')
            }
            return item
        } catch (error) {
            throw Error('Fighter not updated')
        }
    }

    delete(id) {
        try {
            const item = fighterRepository.delete(id)
            if (!item.length) {
                throw Error('Fighter not deleted')
            }
            return item
        } catch (error) {
            throw Error('Fighter not deleted')
        }
    }
}

const fighterService = new FighterService()

export { fighterService }
