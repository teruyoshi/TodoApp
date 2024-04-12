import TodoItem from "./TodoItem"

function TodoList () {
    return (
        <>
            一覧
            <br />
            <TodoItem text="部屋掃除" />
            <br />
            <TodoItem text="風呂掃除" />
            <br />
            <TodoItem text="晩飯" />
        </>
    )
}

export default TodoList
