import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const SaveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    SaveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    SaveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    SaveToLS()
  }

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#ffffff] bg-[radial-gradient(#ffffff33_1px,#1e2939_1px)] bg-[size:20px_20px]"></div>
      <Navbar />
      <div className="container mx-auto my-8 rounded-xl p-5 border-2 border-black bg-gradient-to-br from-pink-100 to-blue-100 h-64 min-h-[80vh] md:w-3/5 w-[90%]">
        <div className="addTodo my-5 flex flex-col gap-3 items-center">
          <h2 className='text-lg font-bold'>Add your todo here</h2>
          <input onChange={handleChange} value={todo} type="text" spellCheck="false" autoFocus placeholder='Enter todo' className='bg-white w-full px-3 py-1 rounded-sm border' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 disabled:cursor-not-allowed p-2 py-1 text-sm cursor-pointer text-white rounded-md mx-6 md:w-1/4 w-full'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} id="" />  Show finished todos
        <h2 className='text-lg font-bold mt-3'>Your todos</h2>
        <div className='todos mt-3 overflow-y-auto h-3/6'>
          {todos.length === 0 && <div className='my-5'>No todos to display</div>}
          {todos.map(item => {

            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className="flex gap-5">
                <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg cursor-pointer text-white rounded-md mx-1'><RiEdit2Fill /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg cursor-pointer text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
