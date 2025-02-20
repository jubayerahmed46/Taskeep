import React from "react";
import TaskBoard from "./TaskBoard";

function Home() {
  return (
    <div className="text-blue-600 font-bold text-xl  w-full ">
      <div>
        <h2 className="bg-white p-4 shadow-sm">Welcome to Taskeep</h2>
      </div>
      <div>
        <TaskBoard />
      </div>
    </div>
  );
}

export default Home;
