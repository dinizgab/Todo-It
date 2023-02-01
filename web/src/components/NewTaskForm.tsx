import { Check } from "phosphor-react";
import { useContext, useState } from "react";
import { api } from "../lib/axios";
import { AuthContext } from "../providers/AuthProvider";

export default function NewTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { accessToken } = useContext(AuthContext);

  async function createNewHabit() {
    if (!title.trim() || !description.trim()) {
      return;
    }

    const userId = localStorage.getItem("loggedUserId")
    await api.post(
      "/create",
      {
        createdBy: userId,
        title,
        description,
      },
      {
        headers: {
          token: accessToken,
        },
      }
    );

    setTitle("");
    setDescription("");
  }

  return (
    <form
      className="w-full flex flex-col mt-6 text-white rounded-lg"
      onSubmit={createNewHabit}
    >
      <label htmlFor="title" className="text-lg mb-1">
        Titulo
      </label>
      <input
        type="text"
        id="title"
        className="bg-zinc-900 border-2 border-zinc-500 rounded-lg p-2 focus:outline-none focus:border-violet-600"
        placeholder="ex.: Fazer compras, Passear com o cachorro..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />

      <label htmlFor="description" className="mt-3 mb-1 text-lg">
        Descricao
      </label>
      <input
        type="text"
        id="description"
        className="bg-zinc-900 border-2 border-zinc-500 rounded-lg p-2 focus:outline-none focus:border-violet-600"
        placeholder="Descricao da atividade"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoComplete="off"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 rounded-lg p-3 mt-5 flex items-center justify-center gap-2"
      >
        <Check size={20} weight="bold" />
        Cadastrar nova tarefa
      </button>
    </form>
  );
}
