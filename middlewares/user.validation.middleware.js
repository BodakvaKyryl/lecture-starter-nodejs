import { userService } from '../services/userService.js'

const validateUserFields = (fields, isUpdate = false) => {
    const errorsMessages = []
    const { email, phoneNumber, password, firstName, lastName, ...rest } = fields

    if (Object.keys(rest).length !== 0) {
        errorsMessages.push('The presence of any extra fields is not allowed')
    }

    if (email !== undefined && typeof email !== 'string') {
        errorsMessages.push('Email must be a string')
    } else if (email !== undefined && !email.match(/^[a-zA-Z0-9_.+-]+@gmail.com$/)) {
        errorsMessages.push('Email is not valid')
    } else if (email !== undefined && userService.search({ email })) {
        errorsMessages.push('Email is already taken')
    }

    if (phoneNumber !== undefined && typeof phoneNumber !== 'string') {
        errorsMessages.push('Phone number must be a string')
    } else if (phoneNumber !== undefined && !phoneNumber.match(/^\+380\d{9}$/)) {
        errorsMessages.push('Phone number is not valid')
    }

    if (password !== undefined && typeof password !== 'string') {
        errorsMessages.push('Password must be a string')
    } else if (password !== undefined && password.length < 3) {
        errorsMessages.push('Password is too short')
    }

    if (firstName !== undefined && typeof firstName !== 'string') {
        errorsMessages.push('First name must be a string')
    } else if (firstName !== undefined && firstName.length === 0) {
        errorsMessages.push('First name is empty')
    }

    if (lastName !== undefined && typeof lastName !== 'string') {
        errorsMessages.push('Last name must be a string')
    } else if (lastName !== undefined && lastName.length === 0) {
        errorsMessages.push('Last name is empty')
    }

    if (!isUpdate && (!email || !phoneNumber || !password)) {
        errorsMessages.push('Some of the required fields are not defined')
    }

    return errorsMessages
}

const createUserValid = (req, res, next) => {
    const errorsMessages = validateUserFields(req.body)

    if (errorsMessages.length !== 0) {
        return res.status(400).json({ errors: errorsMessages })
    }

    next()
}

const updateUserValid = (req, res, next) => {
    const errorsMessages = validateUserFields(req.body, true)

    if (errorsMessages.length !== 0) {
        return res.status(400).json({ errors: errorsMessages })
    }

    next()
}

export { createUserValid, updateUserValid }
