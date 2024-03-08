import { useContext, useEffect, useRef, useState, useMemo } from "react"
import { PokeCard } from "./PokeCard"
import { FiltersContext } from "../context/filters";

export default function PokeList({ pokeData }) {
    const initialLimit = 20
    const maxLimit = 386
    const { pokemonSearch } = useContext(FiltersContext)
    const [limit, setLimit] = useState(initialLimit)
  
    const pokemonBySearch = useMemo(() => {
        return pokeData
            .filter((poke) => poke.name.includes(pokemonSearch))
            .slice(0, limit);
    }, [pokeData, pokemonSearch, limit]);
    
    const finalPageRef = useRef(null)

    function onIntersection(entries){
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && limit<=maxLimit){
            const nuevoLimite = Math.min(limit + 20, maxLimit);
            setLimit(nuevoLimite)
        }
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(onIntersection)
        if (observer && finalPageRef.current){
            observer.observe(finalPageRef.current)
        }

        return() =>{
            if(observer)
            observer.disconnect()
        }
    },[pokemonBySearch])

    useEffect(()=>{
        setLimit(initialLimit)
    },[pokemonSearch])

    return (
        <div className="flex flex-wrap justify-center md:flex-row flex-col gap-y-20 mt-24">
            {
                pokemonBySearch.map((pokeInfo) => (
                    <PokeCard key={pokeInfo.url} pokeData={pokeInfo.url} />
                ))
            }
            <span ref={finalPageRef}></span>
        </div>
    )
}
