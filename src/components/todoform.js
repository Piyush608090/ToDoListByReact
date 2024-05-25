import { useState } from "react";
import { toast } from "react-toastify";
export const TodoForm = (props) => {
// Get Data From App Component
const {value,handleInputChange,setvalue,setEditTaskId,setTodos,editTaskId,todos,url} = props
const [todoId,setTodoId] = useState(21)

// Perform Add Todo Operation
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
             await fetch(url, {
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
    
// Update a Todo From the List 
const handleUpdateTask = async (event) => {
    event.preventDefault()
    const data = todos.find((todo)=>todo.id===editTaskId)
    data.title = value
    const updatedTask = {
    title: value,
    completed: false,
    };
    try {
          await fetch(`${url}/${editTaskId}`, {
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
      
return (
    <>
    <h1>ToDo App </h1>
    <form id="todo-form" style={{width:"70%",marginLeft:"15%"}}>
    <div className="input-group mb-3" >
    <input value= {value} onChange={handleInputChange}type="text"  className="form-control" id="todo-input" required />
    <button className="btn btn-primary" onClick={editTaskId ? handleUpdateTask:handleAddTask}> {editTaskId ? 'Update' : 'Add'} </button>
    </div>
    </form>
    </>
    )
}