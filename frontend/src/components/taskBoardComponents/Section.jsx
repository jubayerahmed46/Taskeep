import { useDrop } from "react-dnd";
import Header from "./Header";
import Task from "./List";

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

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      return mTasks;
    });
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

export default Section;
