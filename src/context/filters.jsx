import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FiltersProvider({ children }) {
    const [pokemonSearch, setPokemonSearch] = useState('')

    return (
        <FiltersContext.Provider value={{
            pokemonSearch,
            setPokemonSearch
        }} >
            {children}
        </FiltersContext.Provider>
    )
}