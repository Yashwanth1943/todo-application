import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {deleteTodo, todoList, onEditedTask} = props
  const {id, title, description} = todoList

  const [isEdit, setIsEdit] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskDesc, setTaskDesc] = useState(description)
  const [isChecked, setCheck] = useState(false)

  const handleSave = () => {
    onEditedTask(id, taskTitle, taskDesc)
    setIsEdit(false)
  }

  return (
    <li className="todo-item">
  {isEdit ? (
    <form
    onSubmit={e => {
      e.preventDefault()
      handleSave()
    }}
    className="edit-form"
  >
    <input
      type="text"
      value={taskTitle}
      onChange={e => setTaskTitle(e.target.value)}
      className="edit-input"
      required
    />
    <textarea
      value={taskDesc}
      onChange={e => setTaskDesc(e.target.value)}
      className="edit-textarea"
      required
    />
    <button className="save-btn" type="submit">Save</button>
  </form>
  ) : (
    <>
      <div className="task-header">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => setCheck(e.target.checked)}
          id={id}
          className="check-box"
        />
        <label
          htmlFor={id}
          className={isChecked ? 'checked-title task-title' : 'task-title'}
        >
          {title}
        </label>
      </div>
      <p className="task-desc">{description}</p>
      <button className="edit-btn" onClick={() => setIsEdit(true)}>Edit</button>
    </>
  )}
  <button className="delete-btn" onClick={() => deleteTodo(id)}>Delete</button>
</li>

  )
}

export default TodoItem
