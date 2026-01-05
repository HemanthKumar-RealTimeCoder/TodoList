import React, { useState, useEffect, useCallback } from "react";
import "../Css/todo.css";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/api";

const Home = ({ showhome }) => {
  const [state, UpdateState] = useState("");
  const [tasks, UpdateTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 🔹 NEW ENHANCEMENT STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetchTodos(currentPage, limit, searchTerm);
      UpdateTask(res.data.data); // Backend now returns { data: [...] }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }, [currentPage, limit, searchTerm]);

  useEffect(() => {
    if (showhome === "home") {
      loadTasks();
    }
  }, [showhome, loadTasks]);

  // Handle Search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  async function Taskhandler() {
    if (state.trim() === "") return;
    try {
      await createTodo({ task: state });
      UpdateState("");
      setCurrentPage(1); 
      loadTasks();
    } catch (err) { console.error("Error adding task", err); }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTasks();
    } catch (err) { console.error("Error deleting task", err); }
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateTodo(id, { task: editValue });
      setEditIndex(null);
      loadTasks();
    } catch (err) { console.error("Error updating task", err); }
  };

  if (showhome !== "home") return null;

  return (
    <div id="todocon">
      <div id="todo">
        <h1 id="hed">What's Up Today!</h1>

        <section id="field">
          {/* 🔹 SEARCH INTEGRATION (NEW) */}
          <div style={{ marginBottom: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <input 
              className="in" 
              style={{ margin: 0, width: "200px" }}
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <select 
               className="in" 
               style={{ margin: 0, width: "80px", borderRadius: "10px" }}
               value={limit}
               onChange={(e) => { setLimit(e.target.value); setCurrentPage(1); }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <input className="in" type="text" value={state} onChange={(e) => UpdateState(e.target.value)} />
          <button className="bt" onClick={Taskhandler}>Add</button>

          <table id="tab">
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td className="trr">{(currentPage - 1) * limit + index + 1}</td>
                  <td className="trr">
                    {editIndex === index ? (
                      <input className="in" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    ) : (
                      <span>{task.task}</span>
                    )}
                  </td>
                  <td className="trr">
                    <button className="bt" onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                  <td className="trr">
                    {editIndex === index ? (
                      <button className="bt" onClick={() => handleSaveEdit(task.id)}>Save</button>
                    ) : (
                      <button className="bt" onClick={() => { setEditIndex(index); setEditValue(task.task); }}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 PAGINATION CONTROLS (NEW) */}
          <div style={{ marginTop: "15px", textAlign: "center", marginRight: "50px" }}>
            <button className="bt" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <span style={{ margin: "0 10px", color: "indigo", fontWeight: "bold" }}>Page {currentPage} of {totalPages}</span>
            <button className="bt" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
          
        </section>
      </div>
    </div>
  );
}

export default Home;