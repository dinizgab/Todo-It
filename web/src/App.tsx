import { Plus } from "phosphor-react";

function App() {
  return (
    <div className="h-screen w-screen bg-background flex flex-col gap-3 justify-center items-center">
      <div className="text-white w-1/4 flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">TaskList</h1>

        <button className="p-3 border-2 rounded-lg border-zinc-400 flex flex-row items-center gap-3 hover:border-violet-500 hover:text-violet-100">
          <Plus size={22} weight="bold" />
          Nova tarefa
        </button>
      </div>
      <div className="text-white">asdfasdf</div>
    </div>
  );
}

export default App;
