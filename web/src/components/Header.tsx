import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";
import NewTaskForm from "./NewTaskForm";

export default function Header() {
  return (
    <div className="text-white w-3/4 lg:w-1/4 flex flex-row justify-between items-center">
      <h1 className="text-3xl font-semibold">ToDo-It</h1>

      <Dialog.Root>
        <Dialog.Trigger className="p-3 border-2 rounded-lg border-zinc-400 flex flex-row items-center gap-3 hover:border-violet-500 hover:text-violet-100">
          <Plus size={22} weight="bold" />
          Nova tarefa
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0">
            <Dialog.Content className="absolute p-10 w-full max-w-md bg-zinc-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
                <X aria-label="Fechar" size={24} />
              </Dialog.Close>
              <Dialog.Title className="text-white font-extrabold text-3xl">
                Criar uma nova tarefa
              </Dialog.Title>

              <NewTaskForm />
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
