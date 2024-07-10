import { useContext, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { FiltersContext } from "../context/filters";
import { MdCatchingPokemon } from "react-icons/md";
import debounce from 'just-debounce-it';

export function SearchForm() {
    const { setPokemonSearch } = useContext(FiltersContext)
    const debouncedSetPokemonSearch = useCallback(debounce(search => {
        setPokemonSearch( search )
      }, 200)
        , [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonSearch(e.target.pokemonName.value.toLowerCase())
    }

    const handleChange = (e) => {
        debouncedSetPokemonSearch(e.target.value.toLowerCase())
    }

    return (
        <>
            <section className="flex items-end justify-center gap-3">
                <h1 className='mt-2 text-5xl font-bold text-center text-slate-200 font-KodeMono'>PokeApi</h1>
                <MdCatchingPokemon className="text-5xl text-slate-200 hover:animate-bounce" />
            </section>
            <form onSubmit={handleSubmit} className='flex justify-center my-4 space-x-5'>
                <input onChange={handleChange} placeholder='Pikachu' className='w-full p-2 font-medium rounded-md outline-none md:w-1/2 text-slate-500 focus:ring-4 ' type="text" name="pokemonName" autoComplete='off' />
                <div className="relative">
                    <button className='absolute p-2 text-xl font-bold text-white -translate-y-1/2 rounded-md bg-gradient-to-br from-red-500 to-orange-300 hover:animate-pulse right-6 top-1/2'><IoSearch /></button>
                </div>
            </form>
        </>
    )
}