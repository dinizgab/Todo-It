import { useEffect, useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import { api } from "./lib/axios";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get("/task").then((res) => setTasks(res.data));
  }, []);
  console.log(tasks);

  return (
    <div className="h-screen w-screen bg-background flex flex-col gap-3 justify-center items-center">
      <Header />
      <div className="text-white w-1/4 px-3 mt-3 flex flex-col gap-3">
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
}

export default App;
