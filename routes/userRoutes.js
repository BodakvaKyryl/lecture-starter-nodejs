import { Router } from 'express'
import { createUserValid, isUserExist, updateUserValid } from '../middlewares/user.validation.middleware.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import {
    deletedUserController,
    getAllUsersController,
    getUserByIdController,
    signUpController,
    updateUserController,
} from '../controllers/user.controllers.js'

const router = Router()

router.post('/', createUserValid, signUpController, responseMiddleware)
router.get('/', getAllUsersController, responseMiddleware)
router.put('/:id', isUserExist, updateUserValid, updateUserController, responseMiddleware)
router.delete('/:id', isUserExist, deletedUserController, responseMiddleware)
router.get('/:id', isUserExist, getUserByIdController, responseMiddleware)

export { router }
