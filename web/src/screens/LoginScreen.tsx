import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../lib/axios";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");

  async function handleUserLogin(event: FormEvent) {
    event.preventDefault();
    await api
      .post("/login", {
        username,
        password,
      })
      .then(({ data }) => setAuthToken(data.token))
      .then(() => {
        authToken ? <Navigate to="/home" /> : null;
      });
  }

  console.log(authToken);
  return (
    <div className="w-screen h-screen bg-background flex flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-5xl font-bold m-4">Tasklist</h1>
      <form
        action=""
        onSubmit={(event) => handleUserLogin(event)}
        className="flex flex-col justify-center bg-zinc-900 h-[45%] w-1/4 rounded-lg p-10 shadow-lg shadow-violet-800"
      >
        <h1 className="my-4 text-3xl font-bold text-center">Faça seu login</h1>

        <label htmlFor="user" className="my-2">
          Usuário
        </label>
        <input
          type="text"
          id="user"
          className="bg-zinc-900 border-2 rounded-lg border-zinc-700 p-3 focus:outline-none focus:border-violet-600"
          placeholder="Usuário"
          autoComplete="off"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password" className="my-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          className="bg-zinc-900 border-2 rounded-lg border-zinc-700 p-3 focus:outline-none focus:border-violet-600"
          placeholder="Senha"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          type="submit"
          className="my-4 p-3 rounded-lg bg-green-600 hover:bg-green-500"
        >
          Entrar
        </button>

        <span className="text-zinc-400 flex items-center gap-1">
          Ainda não possui uma conta?
          <Link to="/register" className="text-violet-500">
            Clique aqui!
          </Link>
        </span>

        {authToken && <Navigate to="/home" />}
      </form>
    </div>
  );
}
