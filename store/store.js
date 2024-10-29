import { userService } from "../services/user.service.js"
import { todoService } from "../services/todo.service.js"

const { createStore } = Redux

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

// Todo
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'

// User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

// Shopping todo
export const TOGGLE_TODO_IS_SHOWN = 'TOGGLE_TODO_IS_SHOWN'
export const ADD_TODO_TO_TODO = 'ADD_TODO_TO_TODO'
export const REMOVE_TODO_FROM_TODO = 'REMOVE_TODO_FROM_TODO'
export const CLEAR_TODO = 'CLEAR_TODO'


const initialState = {
    count: 101,
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    doneTodosPercent: 0,
    loggedinUser: userService.getLoggedinUser(),
    // isTodoShown: false,
    // shoppingTodo: []

}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case CHANGE_BY:
            return {
                ...state,
                count: state.count + cmd.diff
            }
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo._id === cmd.todo._id) ? cmd.todo : todo)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_USER:
            return {
                ...state,
                loggedinUser: cmd.user
            }
        case SET_USER_SCORE:
            return {
                ...state,
                loggedinUser: { ...state.loggedinUser, balance: cmd.balance }
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_DONE_TODOS_PERCENT:
            return {
                ...state,
                doneTodosPercent: cmd.doneTodosPercent
            }
        default: return state
    }
}


export const store = createStore(appReducer)
console.log('store:', store)

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

// export const SET_FILTER_BY = 'SET_FILTER_BY'
// export const REMOVE_TODO_UNDO = 'REMOVE_TODO_UNDO'

// // Shopping todo
// export const TOGGLE_TODO_IS_SHOWN = 'TOGGLE_TODO_IS_SHOWN'
// export const ADD_TODO_TO_TODO = 'ADD_TODO_TO_TODO'
// export const REMOVE_TODO_FROM_TODO = 'REMOVE_TODO_FROM_TODO'
// export const CLEAR_TODO = 'CLEAR_TODO'