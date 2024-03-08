import axios from "axios"

export const getEvolutionsData = (evolutions) => {
    return evolutions.map(async (evo) => axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.name}`))
}