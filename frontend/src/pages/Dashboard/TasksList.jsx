/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function TasksList({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "done"];
  return (
    <div className=" flex  gap-2 mt-3">
      {statuses.map((status, i) => (
        <Section
          key={i}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
}

export default TasksList;

function Section({ status, tasks, setTasks, inProgress, done, todos }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
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

  const addItemToSection = (id) => {
    // console.log(status, id);

    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status };
        }
        return t;
      });

      return mTasks;
    });
  };

  // console.log(tasksToMap);

  return (
    <div ref={drop} className={`w-full ${isOver ? "bg-slate-300" : ""}`}>
      <Header text={headText} count={tasksToMap.length} bg={bg} />
      {tasksToMap.length > 0 && (
        <div className="flex gap-3 flex-col mt-2">
          {tasksToMap.map((task) => {
            return (
              <Task
                key={task.id}
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

function Header({ text, bg, count }) {
  return (
    <div className={`${bg}  shadow-md rounded-md p-2`}>
      {text} {count}
    </div>
  );
}

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`bg-slate-200 shadow-md rounded-md p-2 cursor-pointer select-none ${
        isDragging ? "" : ""
      }`}
    >
      {" "}
      <p>{task.name}</p>{" "}
    </div>
  );
}
