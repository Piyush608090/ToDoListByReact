import 'react-toastify/dist/ReactToastify.css';
import '../src/App.css';
import { useState } from 'react';
import {ToastContainer,toast} from "react-toastify"
import { useEffect } from 'react';

const url = "https://jsonplaceholder.typicode.com/todos"

function App() {
  
  // Set state for Components
  const [editTaskId, setEditTaskId] = useState(null);
  const [todos,setTodos] = useState([])
  const [value,setvalue] = useState("")
  const [todoId,setTodoId] = useState(21)

  // check TaskCompleated
  const handleCheckTask = (index) => {
  const data = todos.find((todo)=>todo.id===index)
  if (data.completed === false){
    data.completed = true
  }else{
  data.completed = false 
  }
  const updatedTask = {
  completed: true,
  };
  setTodos([...todos])
 fetch(`https://jsonplaceholder.typicode.com/todos/${index}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        toast.success('Task updated successfully');
    };
  
  // Set Value To Input Field 
  const GetData = (index) =>{
  setEditTaskId(index)
  const data = todos.find((todo)=>todo.id===index)
  setvalue(data.title)
}
  
// Update a task
  const handleUpdateTask = async (event) => {
  event.preventDefault()
  const data = todos.find((todo)=>todo.id===editTaskId)
  data.title = value
  const updatedTask = {
  title: value,
  completed: false,
  };
  try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${editTaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        toast.success('Task updated successfully');
        setvalue('');
        setEditTaskId(null)
      } catch (error) {
       toast.error('Error updating task');
      }
    };

    // Fetch data From Database
useEffect(()=>{
  fetch(url+"?userId=1")
  .then((res)=>res.json())
  .then(data=>setTodos(data))
},[])

// Set value for  Input Field
const handleInputChange = (event) => {
setvalue(event.target.value);
};

// Perform Add Todo
const handleAddTask = async(event) =>{
event.preventDefault()
if (value.trim() === '') {
return;
}
setTodoId(todoId + 1)
const newTask = {
title: value,
completed: false,
id:todoId
};

try {
         await fetch('https://jsonplaceholder.typicode.com/todos', {
         method: 'POST',
         body: JSON.stringify(newTask),
         headers: {'Content-type': 'application/json; charset=UTF-8',},
         });
         setvalue('');
         setTodos([newTask,...todos])
         toast.success('Task added successfully');
         } catch (error) {
         console.log('Error adding task:', error);
         toast.error('Error adding task');
       }};

// Perform Delete Operation
const DeleteTodo = async(index) => {
const result = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`,{
method:"DELETE"})
const newTodo = await todos.filter((to)=>to.title !== index);             
setTodos(newTodo)
if(result){
      toast.success("todo deletd succesful")
}else{
      toast.error("Not Deleted")
}
}
  return (
    <div className="App">
    <h1>ToDo App </h1>
    
    <form id="todo-form" style={{width:"70%",marginLeft:"15%"}}>
    <ToastContainer />
    <div className="input-group mb-3" >
    <input value= {value} onChange={handleInputChange}type="text"  className="form-control" id="todo-input" required />
    <button className="btn btn-primary" onClick={editTaskId ? handleUpdateTask:handleAddTask}> {editTaskId ? 'Update' : 'Add'} </button>
    </div>
    </form>
    {todos.map((todo,index)=>
    <div className="input-group mb-3" style={{width:"70%",marginLeft:"15%"}}>
    <li className="form-control" id="todo-input" >{todo.title}</li>
    <i  className={todo.completed===true?"bi bi-check-circle-fill":"bi bi-check-circle"} onClick={(()=>handleCheckTask(todo.id))} style={{margin:"10px",fontSize:"20px"}}></i>
    <button className="btn btn-primary" type="submit" onClick={()=>GetData(todo.id)} > Edit </button>
    <button className="btn btn-primary" type="submit" onClick={()=>DeleteTodo(todo.title)}> Delete </button>
    </div>
  )};
 </div>
)};

export default App;
