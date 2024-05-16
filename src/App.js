import 'react-toastify/dist/ReactToastify.css';
import '../src/App.css';
import { useState } from 'react';
import {ToastContainer,toast} from "react-toastify"
import { useEffect } from 'react';
function App() {
// Set state for Components 
  const [editTaskId, setEditTaskId] = useState(null);
  const [todos,settodos] = useState([])
  const [value,setvalue] = useState("")
// Set Value To Input Field 
  const GetData = (id) =>{
  setEditTaskId(id)
  const edit = todos.find((todo)=>todo.id===id)
  setvalue(edit.title)
  }
// Update a task
  const handleUpdateTask = async (event) => {
    event.preventDefault()
  if (value.trim() === '') {
  return;
  }
  const updatedTask = {
  title: value,
  completed: false
  };
  try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${editTaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        toast.success('Task updated successfully');
      } catch (error) {
       toast.error('Error updating task');
      }
    };
// Fetch data From Database
useEffect(()=> { fetch("https://jsonplaceholder.typicode.com/todos")
.then(response => response.json())
.then(data => settodos(data))
.catch(error => console.error(error));
}, [])
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
const newTask = {
title: value,
completed: false
};
try {
         await fetch('https://jsonplaceholder.typicode.com/todos', {
         method: 'POST',
         body: JSON.stringify(newTask),
         headers: {'Content-type': 'application/json; charset=UTF-8',},
         });
         setvalue('');
         toast.success('Task added successfully');
         } catch (error) {
         console.log('Error adding task:', error);
         toast.error('Error adding task');
       }};
// Perform Delete Operation
const DeleteTodo = async(id) => {
const result = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
method:"DELETE"})
if(result){
      toast.success("todo deletd succesful")
}else{
      toast.error("Not Deleted")
}
}
  return (
    <div className="App">
    <h1>ToDo App </h1>
    <ToastContainer />
    <form id="todo-form" style={{width:"70%",marginLeft:"15%"}}>
    <div className="input-group mb-3" >
    <input value= {value} onChange={handleInputChange}type="text"  className="form-control" id="todo-input" required />
    <button className="btn btn-primary" onClick={editTaskId ? handleUpdateTask:handleAddTask}> {editTaskId ? 'Update' : 'Add'} </button>
    </div>
    </form>
    {todos.map((todo)=>
    <div className="input-group mb-3" style={{width:"70%",marginLeft:"15%"}}>
    <li className="form-control" id="todo-input" >{todo.title}</li>
    <button className="btn btn-primary" type="submit" onClick={()=>GetData(todo.id)}> Edit </button>
    <button className="btn btn-primary" type="submit" onClick={()=>DeleteTodo(todo.id)}> Delete </button>
    </div>
  )};
  </div>
)};

export default App;
