const { useState, useEffect } = React
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
    const doneTodosPercent = useSelector((storeState) => storeState.doneTodosPercent)

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    const formattedPercent = todos ? doneTodosPercent.toFixed(2) : null

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
                        <LoginSignup />
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
                    <div className="progress" style={{ width: `${formattedPercent}%` }}></div>
                </div>
                <span>{Math.round(formattedPercent)}%</span>
            </div>
            <UserMsg />
        </header>
    )
}
