import React, { useState } from 'react'

function AddTodoForm (props:{addTodos:(todo:string) => void}) {
    const [todoText, setTodoText] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value)
    }

    const onClickHandler = () => {
        props.addTodos(todoText)
        setTodoText('')
    }

    return (
        <>
            TODOを追加
            <br />
            <input type="text" value={todoText} onChange={onChangeHandler} />
            <button type="button" onClick={onClickHandler}>追加</button>
            <br />
        </>
    )
}

export default AddTodoForm