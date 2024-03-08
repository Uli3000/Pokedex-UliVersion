import { useState, useEffect } from "react"
import axios from "axios"

function useGetPokeData(url){
const [pokemonsData, setPokemonsData] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(({ data }) => {
        setPokemonsData(data.results ? data.results : data)
      })
      .catch((e) => console.error(e))
  }, [])

  return pokemonsData
}

export default useGetPokeData