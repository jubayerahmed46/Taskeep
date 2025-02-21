import { useDrop } from "react-dnd";
import Header from "./Header";
import Task from "./List";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_surl);

function Section({ status, tasks, setTasks, inProgress, done, todos }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      addItemToSection(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let tasksToMap = todos;
  let headText = "";
  let bg = "";
  if (status === "todo") {
    headText = "Todo";
    tasksToMap = todos;
    bg = "bg-slate-400";
  }
  if (status === "inprogress") {
    headText = "inprogress";
    tasksToMap = inProgress;
    bg = "bg-green-500";
  }
  if (status === "done") {
    headText = "done";
    tasksToMap = done;
    bg = "bg-blue-400";
  }

  const addItemToSection = async (id) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));

    await axios
      .patch(`${import.meta.env.VITE_apiUrl}/api/tasks/${id}`, {
        status,
      })
      .then((res) => {
        socket.emit("taskUpdated", res.data.updatedTask);
      })
      .catch((err) => console.log(err));
  };

  // console.log(tasksToMap);

  return (
    <div
      ref={drop}
      className={`p-2 rounded-md  bg-littleBlack/15 w-full ${
        isOver ? "bg-littleBlack/20" : ""
      }`}
    >
      <Header text={headText} count={tasksToMap.length} bg={bg} />
      {tasksToMap.length > 0 && (
        <div className="flex gap-3 flex-col mt-2">
          {tasksToMap.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Section;
