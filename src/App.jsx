import { useState, useEffect } from "react"
import { supabase } from "./services/supabaseClient"
import "./App.css"

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {

  const [page, setPage] = useState("home")
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    const currentUser = data.user
    setUser(currentUser)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPage("login")
  }

  return (
    <div>

      <h1 className="main-title">Catálogo de Películas</h1>

      <div className="navbar">
        <nav>

          <button onClick={() => setPage("home")}>
            Inicio
          </button>

          <button onClick={() => setPage("movies")}>
            Películas
          </button>

          {!user && (
            <>
              <button onClick={() => setPage("register")}>
                Registro
              </button>

              <button onClick={() => setPage("login")}>
                Login
              </button>
            </>
          )}

          {user && (
            <button onClick={logout}>
              Cerrar sesión
            </button>
          )}

        </nav>
      </div>

      {page === "home" && <Home />}

      {page === "register" && <Register />}

      {page === "login" && <Login />}

      {page === "movies" && (
        user
          ? <Movies />
          : <p>Debes iniciar sesión para ver las películas.</p>
      )}

    </div>
  )
}

export default App