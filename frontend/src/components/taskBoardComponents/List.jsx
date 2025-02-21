import axios from "axios";
import { useDrag } from "react-dnd";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_apiUrl);

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deleteHandler = async (id) => {
    const filterTasks = tasks.filter((t) => t._id !== id);
    setTasks(filterTasks);

    await axios
      .delete(`${import.meta.env.VITE_apiUrl}/api/tasks/${id}`, {
        status,
      })
      .then((res) => {
        socket.emit("taskDeleted", res.data.id);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      ref={drag}
      className={` border flex justify-between  bg-white/90 rounded-md p-2 cursor-pointer select-none ${
        isDragging ? "cursor-move" : ""
      }`}
    >
      {" "}
      <div>
        {" "}
        <p>{task.title}</p> <p className="text-xs "> {task.description} </p>
      </div>
      <svg
        onClick={() => deleteHandler(task._id)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 self-end  rounded-full p-0.5 bg-secondary/10 hover:bg-secondary/35 text-white transition-all"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export default Task;
