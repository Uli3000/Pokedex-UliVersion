import React, { useState, useContext, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { PokeCard } from './PokeCard';
import { ModalContext } from '../context/modal';

function Favorites() {
    const { isActivate } = useContext(ModalContext)
    const [favorites, setFavorites] = useState(false);
    const [favsArray, setFavsArray] = useState(JSON.parse(localStorage.getItem('favoritos')))
    
    useEffect(()=>{
        setFavsArray(JSON.parse(localStorage.getItem('favoritos')))
    },[isActivate])

    return (
        <>
            <button onClick={() => setFavorites(!favorites)}>
                <FaRegStar className={`fixed top-4 right-4 text-3xl z-20 ${favorites ? 'text-yellow-500' : ''}`} />
            </button>
            <article className={`bg-slate-200 h-full sm:w-[35%] w-[60%] fixed right-0 top-0 duration-700 translate-x-[100%] z-10 rounded-tl-lg rounded-bl-lg overflow-y-auto hidden-scroll ${favorites ? '-translate-x-[0%]' : ''}`}>
                <h2 className='text-center text-3xl font-bold mt-3 mb-12 font-KodeMono'>Favoritos</h2>
                <section className='pt-8 flex flex-wrap justify-center gap-3 gap-y-20'>
                    {favsArray.map((pokeFav)=>(<PokeCard key={pokeFav} pokeData={`https://pokeapi.co/api/v2/pokemon/${pokeFav}`} />))}
                </section>
            </article>
        </>
    );
}

export default Favorites;
