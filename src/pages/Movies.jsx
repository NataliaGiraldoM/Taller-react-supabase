import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

export default function Movies() {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [nombre, setNombre] = useState("")
  const [imagen, setImagen] = useState("")

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {

    const { data, error } = await supabase
      .from("movies")
      .select("*")

    if (error) {
      console.log(error)
      return
    }

    setMovies(data)
  }

  const addMovie = async () => {

    if (!nombre || !imagen) {
      alert("Completa todos los campos")
      return
    }

    const { error } = await supabase
      .from("movies")
      .insert([{ nombre, imagen }])

    if (error) {
      console.log(error)
      return
    }

    getMovies()
    setNombre("")
    setImagen("")
  }

  const deleteMovie = async (id) => {

    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", id)

    if (error) {
      console.log(error)
      return
    }

    getMovies()
  }

  const updateMovie = async (id) => {

    const nuevoNombre = prompt("Nuevo nombre de la película")

    if (!nuevoNombre) return

    const { error } = await supabase
      .from("movies")
      .update({ nombre: nuevoNombre })
      .eq("id", id)

    if (error) {
      console.log(error)
      return
    }

    getMovies()
  }

  const filteredMovies = movies.filter((movie) =>
    movie.nombre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      <h2>Agregar Película</h2>

      <div className="add-movie-box">

        <input
          type="text"
          placeholder="Nombre de la película"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button onClick={addMovie}>
          Agregar
        </button>

      </div>

      <hr />

      <h2>Lista de Películas</h2>

      <input
        className="search-bar"
        type="text"
        placeholder="Buscar película..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="movies-grid">

        {filteredMovies.map((movie) => (

          <div key={movie.id} className="movie-card">

            <h3>{movie.nombre}</h3>

            <img
              src={movie.imagen}
              alt={movie.nombre}
            />

            <div className="card-buttons">

              <button onClick={() => updateMovie(movie.id)}>
                Editar
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteMovie(movie.id)}
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}