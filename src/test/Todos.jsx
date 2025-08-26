import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

const Todos = () => {
    const todos = useSelector(state => state.todoReducer.todos)
    const user = useSelector(state => state.userReducer.userData)


    const dispatch = useDispatch()

    console.log(user);
    

    return (
        <div>
            <div>Todos</div>
            {
                todos.map(todo => (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                        <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
                    </li>
                ))
            }
        </div>
    )
}

export default Todos
