import { userRepository } from '../repositories/userRepository.js'
import { USER } from '../models/user.js'

class UserService {
    search(data) {
        const item = userRepository.getOne(data)
        if (!item) {
            return null
        }
        return item
    }

    getAll() {
        const items = userRepository.getAll()
        if (!items) {
            return null
        }
        return items
    }

    getOne(id) {
        try {
            const item = userRepository.getOne(id)
            if (!item) {
                throw new Error('User not found')
            }
            return item
        } catch (error) {
            throw new Error('User not found')
        }
    }

    create(data) {
        const validUser = {}
        for (let key in data) {
            if (key in USER && key !== 'id') {
                validUser[key] = data[key]
            }
        }

        try {
            const item = userRepository.create(validUser)
            if (!item) {
                throw new Error('User not created')
            }
            return item
        } catch (error) {
            throw new Error('User not created')
        }
    }

    delete(id) {
        try {
            const item = userRepository.delete(id)
            if (!item) {
                throw Error('User not deleted')
            }
            return item
        } catch (error) {
            throw Error('User not deleted')
        }
    }

    update(id, data) {
        const validUser = {}
        for (let key in data) {
            if (key in USER && key !== 'id') {
                validUser[key] = data[key]
            }
        }

        try {
            const item = userRepository.update(id, validUser)
            if (!item) {
                throw Error('User not updated')
            }
            return item
        } catch (error) {
            throw Error('User not updated')
        }
    }
}

const userService = new UserService()

export { userService }
