import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  console.log(tasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-blue-600 font-bold text-xl  w-full ">
        <div>
          <h2 className="bg-white p-4 shadow-sm">Welcome to Taskeep</h2>
        </div>
        <div>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <TasksList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
