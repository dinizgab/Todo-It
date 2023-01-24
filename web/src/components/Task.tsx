import { Check, Trash } from "phosphor-react";
import { api } from "../lib/axios";

interface TaskProps {
  id: string;
  title: string;
  description: string;
}

export default function Task({ id, title, description }: TaskProps) {
  async function handleDelete(id: string) {
    await api.delete("/delete", {
      params: {
        taskId: id,
      },
    });
  }

  return (
    <div className="w-full h-15 p-3 bg-violet-900 rounded-lg flex flex-row justify-between items-center hover:bg-violet-800">
      <div className="flex flex-col">
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-zinc-200 pr-2">{description}</div>
      </div>

      <div className="flex gap-5 mr-3">
        <button
          onClick={() => handleDelete(id)}
          className="h-11 w-11 p-1 flex items-center justify-center"
        >
          <Check size={32} />
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="h-11 w-11 p-1 flex items-center justify-center"
        >
          <Trash size={32} />
        </button>
      </div>
    </div>
  );
}
