const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()

    const todos = useSelector(storeState => storeState.todos)
    const loggedinUser = useSelector(storeState => storeState.loggedinUser)

    // Calculate the percentage of completed todos
    const totalTodos = useSelector(storeState => storeState.todos.length)
    const completedTodos = todos.filter(todo => todo.isDone).length
    const progress = totalTodos ? (completedTodos / totalTodos) * 100 : 0


    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {loggedinUser ? (
                    < section >
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname} ' ' </Link>
                        <span>your balance: {loggedinUser.balance}</span>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>

            <div className="progress-bar-container">
                <label>Progress:</label>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <span>{Math.round(progress)}%</span>
            </div>
            <UserMsg />
        </header>
    )
}
