import { Check, Trash } from "phosphor-react";

interface TaskProps {
  title: string;
  description: string;
}

export default function Task({ title, description }: TaskProps) {
  return (
    <div className="w-full h-15 p-3 bg-task-background rounded-lg flex flex-row justify-between items-center hover:bg-task-background-hover">
      <div className="flex flex-col">
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-zinc-200 pr-2">{description}</div>
      </div>

      <div className="flex gap-5 mr-3">
        <Check size={32} />
        <Trash size={32} />
      </div>
    </div>
  );
}
