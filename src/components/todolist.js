import { toast } from "react-toastify";
export const TodoList = (props) => {
  const { todos, GetData, setTodos ,url } = props;
  
// check TaskCompleated
  const handleCheckTask = (id) => {
    const data = todos.find((todo) => todo.id === id);
    if (data.completed === false) {
      data.completed = true;
    } else {
      data.completed = false;
    }
    const updatedTask = {
      completed: true,
    };
    setTodos([...todos]);
    fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    toast.success("Task updated successfully");
  };

// Delete Todo Function From the List  
  const deleteTodo = async (id) => {
    const result = await fetch(
      `${url}/${id}`,
      {
        method: "DELETE",
      }
    );
    const newTodo = await todos.filter((to) => to.id !== id);
    if (result) {
      setTodos(newTodo);
      toast.success("todo deletd succesful");
    } else {
      toast.error("Not Deleted");
    }
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          className="input-group mb-3"
          style={{ width: "70%", marginLeft: "15%" }}
        >
          <li className="form-control" id="todo-input">
            {todo.title}
          </li>
          <i
            className={
              todo.completed === true
                ? "bi bi-check-circle-fill"
                : "bi bi-check-circle"
            }
            onClick={() => handleCheckTask(todo.id)}
            style={{ margin: "10px", fontSize: "20px" }}
          ></i>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => GetData(todo.id)}
          >
            {" "}
            Edit{" "}
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => deleteTodo(todo.id)}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      ))}
      ;
    </>
  );
};
