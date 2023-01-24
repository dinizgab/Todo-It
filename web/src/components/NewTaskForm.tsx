export default function NewTaskForm() {
  return (
    <form className="w-full flex flex-col mt-6 text-white">
      <label htmlFor="title" className="text-lg mb-1">
        Titulo
      </label>
      <input
        type="text"
        id="title"
        className="bg-zinc-900 border-2 border-zinc-500 rounded-lg p-2"
        placeholder="ex.: Fazer compras, Passear com o cachorro..."
      />

      <label htmlFor="description" className="mt-3 mb-1 text-lg">
        Descricao
      </label>
      <input
        type="text"
        id="description"
        className="bg-zinc-900 border-2 border-zinc-500 rounded-lg p-2"
        placeholder="Descricao da atividade"
      />

      <button className="w-full bg-green-600 hover:bg-green-500 rounded-lg p-3 mt-5">
        Cadastrar nova tarefa
      </button>
    </form>
  );
}
