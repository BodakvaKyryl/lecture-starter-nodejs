import { USER_BODY } from '../models/user.js'
import { userService } from '../services/userService.js'
import CustomError from '../services/errorService.js'

const userFieldsNumberValid = (obj, schema) => {
    const userKeys = Object.keys(schema)
    const allKeysExist = userKeys.every((key) => obj.hasOwnProperty(key))
    const noneExtraKeys = Object.keys(obj).every((key) => userKeys.includes(key))

    return allKeysExist && noneExtraKeys
}

const userFieldsPutValidator = (obj, schema) => {
    const userKeys = Object.keys(schema)
    const noneExtraKeys = Object.keys(obj).every((key) => userKeys.includes(key))
    const atLeastOneKeyExist = userKeys.reduce(
        (acc, curr) => {
            if (Object.keys(obj).includes(curr)) {
                acc.exist = true
            }
            return acc
        },
        { exist: false }
    )
    return noneExtraKeys && atLeastOneKeyExist.exist
}

const emailValidator = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
    return gmailRegex.test(email)
}

const phoneValidator = (phone) => {
    const ukrainianPhoneRegex = /^\+380\d{9}$/
    return ukrainianPhoneRegex.test(phone)
}

const passwordValidator = (password) => {
    return password.trim().length > 3 ? true : false
}

const isUserInDatabase = (email, phone) => {
    const userByPhone = userService.search({ phoneNumber: phone })
    const userByEmail = userService.search({ email: email })
    if (userByPhone || userByEmail) return true
    return false
}

const createUserValid = (req, res, next) => {
    try {
        const userDetail = req.body
        const isUserExist = isUserInDatabase(userDetail.email, userDetail.phoneNumber)

        const fieldsNumberValid = userFieldsNumberValid(userDetail, USER_BODY)
        const isEmailValid = emailValidator(userDetail.email)
        const isPhoneValid = phoneValidator(userDetail.phoneNumber)
        const isPasswordValid = passwordValidator(userDetail.password)

        if (isUserExist) {
            throw new CustomError(400, 'User already exists in database.')
        }

        if (!fieldsNumberValid || !isEmailValid || !isPhoneValid || !isPasswordValid) {
            throw new CustomError(400, 'Invalid user data.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const isUserExist = (req, res, next) => {
    try {
        const id = req.params
        const user = userService.search(id)
        if (!user) {
            throw new CustomError(404, 'User not found.')
        }
        next()
    } catch (error) {
        next(error)
    }
}

const updateUserValid = (req, res, next) => {
    try {
        const isBodyValid = userFieldsPutValidator(req.body, USER_BODY)
        if (req.body.email) {
            const isEmailValid = emailValidator(req.body.email)
            if (!isEmailValid) throw new CustomError(400, 'Invalid email.')
        }
        if (!isBodyValid) {
            throw new CustomError(400, 'Invalid user data for updating.')
        }
        next()
    } catch (error) {
        next(error)
    }
}

export { createUserValid, updateUserValid }
