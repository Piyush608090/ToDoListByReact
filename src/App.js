import 'react-toastify/dist/ReactToastify.css';
import '../src/App.css';
import { useState } from 'react';
import {ToastContainer} from "react-toastify"
import { useEffect } from 'react';
import { TodoList } from './components/todolist';
import { TodoForm } from './components/todoform';

//  URL for fetching Data From Database
const url = "https://jsonplaceholder.typicode.com/todos"

function App() {

// Set state for Components
  const [editTaskId, setEditTaskId] = useState(null);
  const [todos,setTodos] = useState([])
  const [value,setvalue] = useState("")
  
// Set Value To Input Field 
  const GetData = (index) =>{
  setEditTaskId(index)
  const data = todos.find((todo)=>todo.id===index)
  setvalue(data.title)
}
  
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

return (
    <div className="App">
    <TodoForm value={value} setTodos={setTodos} todos={todos} url={url} setvalue={setvalue} setEditTaskId={setEditTaskId} handleInputChange={handleInputChange} editTaskId={editTaskId} />
    <ToastContainer />
    <TodoList setTodos={setTodos} todos={todos} url={url} GetData={GetData} />
 </div>
)};
export default App;
