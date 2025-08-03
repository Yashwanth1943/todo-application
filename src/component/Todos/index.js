import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'

const LOCAL_STORAGE_KEY = 'todos_app_list'

class Todos extends Component {
  state = {
    todoList: [],
    inputData: '',
    inputDescription: '',
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodos) {
        this.setState({todoList: JSON.parse(storedTodos)})
    } else {
        const defaultTodos = [
        {
            id: 1,
            title: 'Do Works',
            description: 'Project Works',
        },
        {
            id: 2,
            title: 'Watching Movie',
            description: 'Kingdom',
        },
        ]
        this.setState({todoList: defaultTodos})
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultTodos)) // <-- add this line
    }
    }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.todoList)
      )
    }
  }

  deleteTodo = todoId => {
    const filteredUsersData = this.state.todoList.filter(
      each => each.id !== todoId
    )
    this.setState({todoList: filteredUsersData})
  }

  onChangeInput = event => {
    this.setState({inputData: event.target.value})
  }

  onChangeInputDescription = event => {
    this.setState({inputDescription: event.target.value})
  }

  onAddNewTask = () => {
    const {inputData, inputDescription} = this.state

    if (inputData.trim() === '' || inputDescription.trim() === '') {
      alert('Both Title and Description are required!')
      return
    }

    const newTask = {
      id: uuidv4(),
      title: inputData,
      description: inputDescription,
    }

    this.setState(prev => ({
      todoList: [...prev.todoList, newTask],
      inputData: '',
      inputDescription: '',
    }))
  }

  onSaveExitingTask = (id, taskTitle) => {
    const newUpdatedList = this.state.todoList.map(each => {
      if (each.id === id) {
        return {...each, title: taskTitle}
      }
      return each
    })
    this.setState({todoList: newUpdatedList})
  }

  render() {
    const {todoList, inputData, inputDescription} = this.state
    return (
      <div className="container">
        <h1>Simple Todos</h1>
        <div>
<div className="adding-container">
  <form onSubmit={this.onAddNewTask}>
  <label htmlFor="title">Title</label>
  <input
    id="title"
    type="text"
    placeholder="Add Task"
    value={inputData}
    onChange={this.onChangeInput}
    required
  />

  <label htmlFor="description">Description</label>
  <input
    id="description"
    type="text"
    placeholder="Add Description"
    value={inputDescription}
    onChange={this.onChangeInputDescription}
    required
  />

  <button className="add-button" type="submit">
    Add
  </button>
</form>

</div>

          <ul>
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoList={eachTodo}
                onEditedTask={this.onSaveExitingTask}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Todos
