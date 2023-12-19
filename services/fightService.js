import { fightRepository } from '../repositories/fightRepository.js'

class FightersService {
    search(data) {
        const item = fightRepository.getOne(data)
        if (!item) {
            return null
        }
        return item
    }

    getAll() {
        const items = fightRepository.getAll()
        if (!items) {
            return null
        }
        return items
    }

    getOne(id) {
        const item = fightRepository.getOne(id)
        if (!item) {
            throw new Error('Fight not found')
        }
        return item
    }

    create(data) {
        const item = fightRepository.create(data)
        if (!item) {
            throw new Error('Fight not created')
        }
        return item
    }

    update(id, data) {
        const item = fightRepository.update(id, data)
        if (!item) {
            throw new Error('Fight not updated')
        }
        return item
    }

    delete(id) {
        const item = fightRepository.delete(id)
        if (!item) {
            throw new Error('Fight not deleted')
        }
        return item
    }
}

const fightersService = new FightersService()

export { fightersService }
