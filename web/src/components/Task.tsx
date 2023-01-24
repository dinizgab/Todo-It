import { Check, Trash } from "phosphor-react";
import clsx from "clsx";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onTaskDelete: (id: string) => void;
  onTaskCompleteToggle: (id: string) => void;
}

export default function Task({
  id,
  title,
  description,
  isCompleted,
  onTaskCompleteToggle,
  onTaskDelete,
}: TaskProps) {
  return (
    <div className="w-full h-15 p-3  bg-violet-900 rounded-lg flex flex-row justify-between items-center hover:bg-violet-800 pr-2">
      <div className="flex flex-col">
        <div
          className={clsx("text-xl font-bold", {
            "line-through text-zinc-300": isCompleted,
          })}
        >
          {title}
        </div>
        <div
          className={clsx("text-white", {
            "line-through text-zinc-300": isCompleted,
          })}
        >
          {description}
        </div>
      </div>

      <div className="flex gap-2 mr-3">
        <button
          onClick={() => onTaskCompleteToggle(id)}
          className="h-11 w-11 p-1 flex items-center justify-center hover:text-green-500"
        >
          <Check size={32} />
        </button>
        <button
          onClick={() => onTaskDelete(id)}
          className="h-11 w-11 p-1 flex items-center justify-center hover:text-red-500"
        >
          <Trash size={32} />
        </button>
      </div>
    </div>
  );
}
