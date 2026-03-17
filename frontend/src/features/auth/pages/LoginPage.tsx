import { useState } from "react"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log(email, password)

    localStorage.setItem("token", "123")

    window.location.href = "/"
  }

  return (
    <div
      style={{
        width: 350,
        padding: 30,
        background: "white",
        borderRadius: 8,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width:"100%", padding:10, marginBottom:10 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width:"100%", padding:10, marginBottom:20 }}
        />

        <button
          style={{
            width:"100%",
            padding:10,
            background:"#4f46e5",
            color:"white",
            border:"none",
            borderRadius:4
          }}
        >
          Entrar
        </button>

      </form>
    </div>
  )
}