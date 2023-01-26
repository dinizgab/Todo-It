import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

export default function RegisterScreen() {
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleUserRegistration(event: FormEvent) {
    event.preventDefault()
    await api.post("/register", {
      user, email, password
    })

    setUser("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="w-screen h-screen bg-background flex flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-5xl font-bold m-4">Tasklist</h1>
      <form
        action=""
        onSubmit={handleUserRegistration}
        className="flex flex-col justify-center bg-zinc-900 h-1/2 w-1/4 rounded-lg p-10 shadow-lg shadow-violet-800"
      >
        <h1 className="my-4 text-3xl font-bold text-center">
          Crie a sua conta!
        </h1>

        <label htmlFor="user" className="my-2">
          Usuário
        </label>
        <input
          type="text"
          id="user"
          className="bg-zinc-900 border-2 rounded-lg border-zinc-700 p-3 focus:outline-none focus:border-violet-600"
          placeholder="Usuário"
          autoComplete="off"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />

        <label htmlFor="email" className="my-2">
          E-mail
        </label>
        <input
          type="text"
          id="email"
          className="bg-zinc-900 border-2 rounded-lg border-zinc-700 p-3 focus:outline-none focus:border-violet-600"
          placeholder="E-mail"
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}

        />

        <label htmlFor="password" className="my-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          className="bg-zinc-900 border-2 rounded-lg border-zinc-700 p-3 focus:outline-none focus:border-violet-600"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}

        />

        <button
          type="submit"
          className="my-4 p-3 rounded-lg bg-green-600 hover:bg-green-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
