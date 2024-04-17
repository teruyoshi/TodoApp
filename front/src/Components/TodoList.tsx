import TodoItem from "./TodoItem"

function TodoList (props:{todos:{text:string}[]}) {

    return (
        <>
            一覧
            {props.todos.map((todo) => {
                return (
                    <>
                        <br />
                        <TodoItem text={todo.text} />
                    </>
                )
            })}
        </>
    )
}

export default TodoList
