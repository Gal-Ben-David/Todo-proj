import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { updateBalance } from '../store/actions/user.actions.js'
import { SET_TODOS, SET_FILTER_BY } from '../store/store.js'

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        if (defaultFilter) {
            dispatch({ type: SET_FILTER_BY, filterBy: defaultFilter })
        }
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos()
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        console.log(todoToSave)
        saveTodo(todoToSave)
            .then((savedTodo) => {
                if (savedTodo.isDone) updateBalance()
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoToSave._id)
            })
    }

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {isLoading ? <p>Loading...</p>
                : todos && todos.length === 0 ? <div>No todos to show</div>
                    : <Fragment>
                        <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />

                        <hr />
                        <h2>Todos Table</h2>
                        <div style={{ width: '60%', margin: 'auto' }}>
                            <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                        </div>
                    </Fragment>}

        </section>
    )
}