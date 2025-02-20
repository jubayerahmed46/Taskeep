import { useState } from "react";
import Input from "../../components/Input";

function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // there will be "in-progress", "done"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setTasks((prev) => {
      const list = [...prev, task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    setTask({ id: "", name: "", status: "done" });
  };

  return (
    <div>
      <form className="flex " onSubmit={handleSubmit}>
        <Input
          label=""
          onChange={(e) =>
            setTask({
              ...task,
              id: Math.random() * 837498,
              name: e.target.value,
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
