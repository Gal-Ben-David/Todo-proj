import { utilService } from '../services/util.service.js'
const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => {
            const updatedFilter = { ...prevFilter, [field]: value }
            debouncedSetFilter(updatedFilter) // Debounce the parent update call
            return updatedFilter
        })
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance } = filterByToEdit

    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <select className="filter-type" name="type" onChange={handleChange} value={filterBy.type}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>

            <form onSubmit={onSubmitFilter}>
                <input value={filterBy.txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={filterBy.importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}