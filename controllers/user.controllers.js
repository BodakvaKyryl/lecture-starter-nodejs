import { userService } from '../services/userService.js'

export const signUpController = (req, res, next) => {
    const newUser = userService.createUser(req.body)
    res.locals.queryResult = newUser
    next()
}

export const getAllUsersController = (req, res, next) => {
    const users = userService.getAllUsers()
    res.locals.queryResult = users
    next()
}

export const updateUserController = (req, res, next) => {
    const id = req.params.id
    const data = req.body
    const patchedUser = userService.updateUser(id, data)
    res.locals.queryResult = patchedUser
    next()
}

export const deletedUserController = (req, res, next) => {
    const id = req.params.id
    const deletedUser = userService.deleteUser(id)
    res.locals.queryResult = deletedUser
    next()
}

export const getUserByIdController = (req, res, next) => {
    const id = req.params
    const user = userService.search(id)
    res.locals.queryResult = user
    next()
}
