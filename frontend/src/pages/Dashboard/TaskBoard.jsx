import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_apiUrl);

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_apiUrl}/api/tasks/${user.email}`
      );

      setTasks(data);
      return data;
    },
  });

  useEffect(() => {
    // When a new task is created
    socket.on("taskCreated", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    // When a task is updated
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // When a task is deleted
    socket.on("taskDeleted", (deletedTaskId) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTaskId)
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

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
