import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import Task from "../components/Task";
import { api } from "../lib/axios";
import { AuthContext } from "../providers/AuthProvider";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { accessToken } = useContext(AuthContext);

  async function handleTaskDelete(id: string) {
    await api.delete("/delete", {
      headers: {
        token: accessToken,
      },

      params: {
        taskId: id,
      },
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleTaskToggle(id: string) {
    console
    await api.patch(`/${id}/toggle`, {
      headers: {
        token: accessToken,
      },
    });

    await api
      .get("/home", {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => setTasks(res.data));
  }

  useEffect(() => {
    api
      .get("/home", {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => setTasks(res.data));

      console.log(accessToken)
  }, []);

  return (
    <div
      className={clsx(
        "h-screen w-full py-20 bg-background flex flex-col gap-3 justify-center items-center",
        {
          "h-full": tasks.length > 5,
        }
      )}
    >
      <Header />
      <div className="text-white w-3/4 lg:w-1/4 mt-3 flex flex-col gap-3">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            onTaskDelete={handleTaskDelete}
            onTaskCompleteToggle={handleTaskToggle}
            isCompleted={task.completed}
          />
        ))}
      </div>
    </div>
  );
}
