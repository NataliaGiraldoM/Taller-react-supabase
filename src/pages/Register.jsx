import { useState } from "react"
import { supabase } from "../services/supabaseClient"

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Completa todos los campos")
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Usuario registrado correctamente")
    }
  }

  return (

    <div className="form-box">

      <h2>Registro de usuario</h2>

      <form onSubmit={handleRegister}>

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
          Registrarse
        </button>

      </form>

    </div>

  )
}