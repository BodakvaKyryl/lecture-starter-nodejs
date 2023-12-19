// @ts-check

import { userService } from '../services/userService.js'

const validateUserFields = (fields, isUpdate = false) => {
    const errors = []
    const { email, phoneNumber, password, firstName, lastName, ...rest } = fields

    if (Object.keys(rest).length !== 0) {
        errors.push('The presence of any extra fields is not allowed')
    }

    if (email !== undefined && typeof email !== 'string') {
        errors.push('Email must be a string')
    } else if (email !== undefined && !email.match(/^[a-zA-Z0-9_.+-]+@gmail.com$/)) {
        errors.push('Email is not valid')
    } else if (email !== undefined && userService.search({ email })) {
        errors.push('Email is already taken')
    }

    if (phoneNumber !== undefined && typeof phoneNumber !== 'string') {
        errors.push('Phone number must be a string')
    } else if (phoneNumber !== undefined && !phoneNumber.match(/^\+380\d{9}$/)) {
        errors.push('Phone number is not valid')
    }

    if (password !== undefined && typeof password !== 'string') {
        errors.push('Password must be a string')
    } else if (password !== undefined && password.length < 3) {
        errors.push('Password is too short')
    }

    if (firstName !== undefined && typeof firstName !== 'string') {
        errors.push('First name must be a string')
    } else if (firstName !== undefined && firstName.length === 0) {
        errors.push('First name is empty')
    }

    if (lastName !== undefined && typeof lastName !== 'string') {
        errors.push('Last name must be a string')
    } else if (lastName !== undefined && lastName.length === 0) {
        errors.push('Last name is empty')
    }

    if (!isUpdate && (!email || !phoneNumber || !password)) {
        errors.push('Some of the required fields are not defined')
    }

    return errors
}

const createUserValid = (req, res, next) => {
    const errors = validateUserFields(req.body)

    if (errors.length) {
        res.status(400).json({ error: true, message: errors.join('\n') })
        return
    }

    next()
}

const updateUserValid = (req, res, next) => {
    const errors = validateUserFields(req.body, true)

    if (errors.length) {
        res.status(400).json({ error: true, message: errors.join('\n') })
        return
    }

    next()
}

export { createUserValid, updateUserValid }
