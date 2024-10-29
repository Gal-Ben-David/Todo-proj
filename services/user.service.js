import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateBalance,
    updateUserPrefs,
    addActivity
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, activities: [], prefs: getDefaultPrefs() }
    user.createdAt = user.updatedAt = Date.now()
    user.balance = 1000

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, prefs: user.prefs, activities: user.activities }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getDefaultPrefs() {
    return { color: '#eeeeee', bgColor: "#191919", fullname: '' }
}

function updateUserPrefs(userToUpdate) {
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            user = { ...user, ...userToUpdate }
            return _saveUser(user)
        })
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

function updateBalance() {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            user.balance += 10
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.balance
        })
}

function addActivity(txt) {
    const activity = {
        txt,
        at: Date.now()
    }
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return Promise.reject('No loggedin user')
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.unshift(activity)
            return _saveUser(user)
        })
}

function _saveUser(user) {
    return storageService.put(STORAGE_KEY, user)
        .then((user) => {
            _setLoggedinUser(user)
            return user
        })
}

// signup({ username: 'muki', password: 'muki1', fullname: 'Muki Ja' })
// login({ username: 'muki', password: 'muki1' })

// Data Model:
const user = {
    _id: "KAtTl",
    username: "muki",
    password: "muki1",
    fullname: "Muki Ja",
    createdAt: 1711490430252,
    updatedAt: 1711490430999
}