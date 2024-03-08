import { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { FiltersContext } from "../context/filters";
import { MdCatchingPokemon } from "react-icons/md";

export function SearchForm() {
    const { setPokemonSearch } = useContext(FiltersContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonSearch(e.target.pokemonName.value.toLowerCase())
    }
    return (
        <>
            <section className="flex justify-center items-end gap-3">
                <h1 className='text-center text-5xl font-bold text-slate-200 mt-2 font-KodeMono'>PokeApi</h1>
                <MdCatchingPokemon className="text-5xl text-slate-200 hover:animate-bounce" />
            </section>
            <form onSubmit={handleSubmit} className='flex justify-center space-x-5 my-4'>
                <input placeholder='Pikachu' className='outline-none rounded-md w-full md:w-1/2 font-medium text-slate-500 focus:ring-4 p-2 ' type="text" name="pokemonName" autoComplete='off' />
                <div className="relative">
                    <button className='bg-gradient-to-br from-red-500 to-orange-300 p-2 rounded-md font-bold text-white hover:animate-pulse text-xl absolute right-6 top-1/2 -translate-y-1/2'><IoSearch /></button>
                </div>
            </form>
        </>
    )
}