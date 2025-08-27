import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import { useState } from 'react'


const AddTodo = () => {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])

    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()

        dispatch(addTodo(input))
        setInput('')
    }

    return (
        <div>
            <form action="" onSubmit={addTodoHandler}>
                <input
                    type="text"
                    placeholder="Enter your todo"
                    value={input}
                    className='text-zinc-900'
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
