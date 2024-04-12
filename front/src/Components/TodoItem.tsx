function TodoItem (props:{text:string}) {
    return (
        <>
            <label>
                <input type="checkbox" />
                {props.text}
            </label>
        </>
    )
}

export default TodoItem
