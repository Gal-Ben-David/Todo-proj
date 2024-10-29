import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_SCORE, store } from "../store.js"


export function login(credentials) {

    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('User actions -> Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {

    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('User actions -> Cannot signup:', err)
            throw err
        })
}

export function logout() {

    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.log('User actions -> Cannot logout:', err)
            throw err
        })
}

export function updateBalance() {

    return userService.updateBalance()
        .then(newBalance => {
            store.dispatch({ type: SET_USER_SCORE, balance: newBalance })
        })
        .catch(err => {
            console.log('User actions -> Cannot checkout:', err)
            throw err
        })
}

export function updateUser(userToUpdate) {

    return userService.updateUserPrefs(userToUpdate)
        .then((updatedUser) => {
            store.dispatch({ type: SET_USER, user: updatedUser, })
        })
        .catch(err => {
            console.error('Cannot update user:', err)
            throw err
        })
}