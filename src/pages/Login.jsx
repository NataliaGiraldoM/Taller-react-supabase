import { useState } from "react"
import { supabase } from "../services/supabaseClient"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Login correcto")
      window.location.reload()
    }
  }

  return (
    <div className="form-box">

      <h2>Iniciar sesión</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>
          Ingresar
        </button>

      </form>

    </div>
  )
}