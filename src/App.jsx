import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    if(todo === ""){
      alert("Please enter a todo")
      return
    }else{
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
      setTodo("")
      saveToLS()
    }

    console.log(todos)
    // console.log(localStorage.getItem("todos")) 
    console.log(JSON.parse(localStorage.getItem("todos")))

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }

  const handleEdit = (e, id) => {
    let t= todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    handleDelete(e, id)
    saveToLS()
    
    // setTodos(todos.filter(item => item.id !== id));
  }
  
  const handleDelete = (e, id) => {
    setTodos(todos.filter(item => item.id !== id));
    saveToLS()
    console.log(todos)
    
};

  const handlekeydown = (e) => {
    if(e.key === "Enter"){
      handleAdd()
    }
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log(id) 
    todos.filter(item => item.id === id)[0].isCompleted = !todos.filter(item => item.id === id)[0].isCompleted
    setTodos([...todos])
  }

  return (
    <>
      <Navbar/>    
      <div className="container mx-auto my-10 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-[60vw] align-items-center"> 
        <div className="addTodo">
          <h2 className="text-lg font-bold mb-5 uppercase">Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className="w-1/2 p-2 text-black rounded-lg bg-white" placeholder="Enter Todo" />
          <button onKeyDown={handlekeydown} onClick={() => { handleAdd(); saveToLS(); }} className="bg-indigo-600 ml-2 text-white p-2 rounded-lg mt-2" >Save</button>
        </div>        
        <h1 className='text-2xl font-bold mt-10 uppercase mb-3'>Your Todos</h1>       
        <div className="todos justify-between flex flex-col ">
          {todos.length === 0 && <div className="text-center text-lg font-bold">No Todos Yet!!</div>}
          {todos.map(items => (
            <div className="todo flex justify-between my-2" key={items.id}>
              <input onChange={handleCheckbox} type="checkbox"  name={items.id} className="w-5 h-5 mt-2" />
              <div className={`ml: 5 text-left ${items.isCompleted ? "line-through" : ""}`}>
                {items.todo}
              </div>
              <div className="buttons gap-2 flex">
                <button onClick={(e)=>{handleEdit(e, items.id)}} className="bg-indigo-600 text-white p-0.5 rounded-lg">
                  Edit  
                </button>
                <button onClick={(e)=>{handleDelete(e, items.id)}} className="bg-indigo-600 text-white p-0.5 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div> 
      </div> 
    </>
  )
}

export default App
