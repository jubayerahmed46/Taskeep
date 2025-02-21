import { useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_surl);
function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setTasks(async (prev) => [...prev, task]);
    const res = await axios.post(`${import.meta.env.VITE_apiUrl}/tasks`, task);
    socket.emit("taskCreated", res.data);

    setTask({ title: "", description: "", status: "todo" });
    e.target.reset();
  };

  return (
    <div>
      <form
        className="flex gap-2 flex-col max-w-xl  mx-auto my-5 p-4 bg-slate-300 rounded-md"
        onSubmit={handleSubmit}
      >
        <Input
          label=""
          name="title"
          value={task.title}
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
            })
          }
        />
        <Input
          label=""
          name="description"
          value={task.description}
          onChange={(e) =>
            setTask({
              ...task,
              description: e.target.value,
            })
          }
        />
        <button className="bg-black p-2 rounded-md shadow-md  text-white ml-2">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
