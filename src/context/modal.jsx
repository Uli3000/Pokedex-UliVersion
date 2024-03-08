import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { formatAbilities, formatDescription, formatEvolves, formatStats, formatTypes, getSprite } from '../services_others/formatData'

export const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [modalInfo, setModalInfo] = useState(null)
    const [isActivate, setIsActivate] = useState(false)

    async function modalOn (pokeData) {
        const {name, id, weight, height, stats, types, abilities, species, sprites} = pokeData

        const { data: dataSpecies } = await axios.get(species.url)
        const { data: dataEvolves } = await axios.get(dataSpecies.evolution_chain.url)
        const evolves = await formatEvolves(dataEvolves)
        
        setModalInfo(
            {
                name: name,
                id: id,
                weight: weight,
                height: height,
                stats: formatStats(stats),
                types: formatTypes(types),
                abilities: formatAbilities(abilities),
                description: formatDescription(dataSpecies),
                evolves,
                sprite: getSprite(sprites)
            }
        )
        setIsActivate(true)
    }

    function modalOff() {
        setIsActivate(false)
    }

    return (
        <ModalContext.Provider value={{
            isActivate,
            modalOn,
            modalOff,
            modalInfo
        }} >
            {children}
        </ModalContext.Provider>
    )
}