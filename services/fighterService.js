import { fighterRepository } from '../repositories/fighterRepository.js'

class FighterService {
    getAllFighters() {
        const fighters = fighterRepository.getAll()
        return fighters
    }

    createFighter(data) {
        const fighter = fighterRepository.create(data)
        return fighter
    }

    searchFighter(search) {
        const item = fighterRepository.getOne(search)
        if (!item) {
            return null
        }
        return item
    }

    deleteFighter(id) {
        const deletedFighter = fighterRepository.delete(id)
        return deletedFighter
    }

    updateFighter(id, dataToUpdate) {
        const updatedFighter = fighterRepository.update(id, dataToUpdate)
        return updatedFighter
    }
}

const fighterService = new FighterService()

export { fighterService }
