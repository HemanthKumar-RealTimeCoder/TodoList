import { useState } from "react";

const Todo = ({showhome}) => {
  const [task, setTask] = useState(""); //hello
  const [list, setList] = useState([]); 

  const addTask = () => {
    if (!task) return;
     setTask([...list, task]);
     console.log(list);
    // setList([...list, task]);
   
  };

  const removeTask = (index) => {
    setList(list.filter((e, i) => i !== index));
  };
   if (showhome !== true) {
    return null;
  }
  return (
    
        <div style={{ padding: "40px" }}>
        <h2>My To Do List</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
      
    
    
  );
};

export default Todo;
