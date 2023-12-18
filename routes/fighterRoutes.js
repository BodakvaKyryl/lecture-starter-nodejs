import { Router } from 'express'
import { responseMiddleware } from '../middlewares/response.middleware.js'
import { createFighterValid, isFighterExist, updateFighterValid } from '../middlewares/fighter.validation.middleware.js'
import {
    createFighterController,
    deletedFighterController,
    getAllFightersController,
    getFighterByIdController,
    updateFighterController,
} from '../controllers/fighters.controllers.js'

const router = Router()

router.get('/', getAllFightersController, responseMiddleware)
router.get('/:id', isFighterExist, getFighterByIdController, responseMiddleware)
router.post('/', createFighterValid, createFighterController, responseMiddleware)
router.put('/:id', isFighterExist, updateFighterValid, updateFighterController, responseMiddleware)
router.delete('/:id', isFighterExist, deletedFighterController, responseMiddleware)

export { router }
