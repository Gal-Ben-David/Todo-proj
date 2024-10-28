import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useState, useEffect, Fragment, useRef } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    const [todoIdToDelete, setTodoIdToDelete] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Fragment>
            <ul className="todo-list">
                {todos.map(todo =>
                    <li key={todo._id}>
                        <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                        <section>
                            <button onClick={() => { setTodoIdToDelete(todo._id); setIsModalOpen(true) }}>Remove</button>
                            <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                        </section>
                    </li>
                )}
            </ul>
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>Are you sure you want to delete this item?</p>
                        <div className="modal-buttons">
                            <button onClick={() => { setIsModalOpen(false); onRemoveTodo(todoIdToDelete) }}>Yes</button>
                            <button onClick={() => { setIsModalOpen(false) }}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}