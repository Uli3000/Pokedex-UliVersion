import { useContext } from "react"
import { ModalContext } from "../context/modal"
import { typeColors } from "../services_others/consts";
import useGetPokeData from "../hooks/useGetPokeData";

export function PokeCard({ pokeData }) {
    const { modalOn } = useContext(ModalContext)
    const pokemon = useGetPokeData(pokeData)

    return (
        <div className='relative flex flex-col justify-center content-center md:w-1/5 m-4 bg-gradient-to-br from-slate-100 to-slate-400 p-2 shadow-xl rounded-md group' onClick={() => modalOn(pokemon)}>
            <header className="h-20">
            <img className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-60 group-hover:scale-125 transition-transform pixelated' src={pokemon.sprites?.versions["generation-v"]["black-white"].front_default} alt="Img" />
            </header>
            <div className='p-3'>
                <h2 className='text-center  text-3xl font-bold text-gray-000 capitalize lg:text-3xl md:text-xl'>{pokemon?.name}</h2>
                <ul className="flex justify-evenly p-3 space-x-3">
                    {
                        pokemon.types?.map((types) => (<li className={`${typeColors[types.type.name]} p-2 rounded-md capitalize font-serif text-slate-200 shadow-lg`} key={types.type.name}>{types.type?.name}</li>))
                    }
                </ul>
            </div>
        </div>
    )
}