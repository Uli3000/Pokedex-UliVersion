import { useContext, useState, useEffect } from "react"
import { ModalContext } from "../context/modal"
import { CgClose } from "react-icons/cg";
import { typeColors, getStatColorClass } from "../services_others/consts";
import EvolveMethod from "./EvolveMethod";
import { FaRegStar } from 'react-icons/fa';

export default function PokeInfoModal() {
  const { isActivate, modalOff, modalInfo, modalOn } = useContext(ModalContext)
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedSetArray = JSON.parse(localStorage.getItem('favoritos')) || [];
    const storedSet = new Set(storedSetArray);
    setIsFavorite(storedSet.has(modalInfo?.name));
  }, [modalInfo]);

  const handleClickFavorites = () => {
    const storedSetArray = JSON.parse(localStorage.getItem('favoritos')) || [];
    const storedSet = new Set(storedSetArray);

    if (storedSet.has(modalInfo?.name)) {
      storedSet.delete(modalInfo?.name);
    } else {
      storedSet.add(modalInfo?.name);
    }

    localStorage.setItem('favoritos', JSON.stringify(Array.from(storedSet)));

    setIsFavorite(storedSet.has(modalInfo?.name));
  };

  return (
    <section className={`${isActivate ? 'visible opacity-100' : 'invisible opacity-0'} z-50 fixed top-0 right-0 w-full h-screen ${typeColors[modalInfo?.types[0]]} transition-opacity duration-300`}>
      <button onClick={modalOff} className='bg-slate-100 p-2 absolute right-4 top-4 rounded-md hover:bg-white hover:scale-105'>
        <CgClose className='text-3xl' />
      </button>
      <article className='absolute bg-white w-full top-28 h-screen rounded-t-2xl px-2'>
        <button className={`absolute top-3 right-5 text-4xl ${isFavorite ? 'text-yellow-200' : ''} hover:scale-125`} onClick={handleClickFavorites}>
          <FaRegStar  />
        </button>
        <img src={modalInfo?.sprite} alt='Pokemon_Image' className='absolute top-0 right-1/2 -translate-y-[85%] sm:-translate-y-[62%] translate-x-1/2 size-28 sm:size-36 object-contain pixelated' />
        <section className='pt-4 sm:pt-12 overflow-y-auto h-full hidden-scroll'>
          <h2 className='text-center font-bold capitalize text-3xl font-serif'>{modalInfo?.name}</h2>
          <p className='text-center text-slate-400 text-lg'>#{modalInfo?.id}</p>
          <ul className="flex justify-center p-1 space-x-3">
            {
              modalInfo?.types?.map((types) => (<li className={`${typeColors[types]} p-2 rounded-md capitalize font-serif text-slate-100 shadow-lg`} key={types}>{types}</li>))
            }
          </ul>
          <p className='text-center text-slate-800 mt-1'>{modalInfo?.description}</p>
          <section className='flex justify-center gap-24 mt-2'>
            <div className='flex justify-center items-center flex-col'>
              <h3 className='font-bold text-lg text-center'>Weight</h3>
              <p className='bg-slate-200 rounded-xl p-1 w-[180%] text-center '>{modalInfo?.weight}</p>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <h3 className='font-bold text-lg'>Height</h3>
              <p className='bg-slate-200 rounded-xl p-1 w-[180%] text-center'>{modalInfo?.height}</p>
            </div>
          </section>
          <div className='bg-slate-50 rounded-xl p-3 mt-3'>
            <h2 className='text-center font-bold text-2xl '>Abilities</h2>
            <ul className='flex justify-center sm:gap-48 gap-28'>
              {modalInfo?.abilities.map((ability) => (
                <li key={ability.name} className='flex justify-center items-center flex-col'>
                  <h3 className='font-bold text-lg'>{ability.hidden ? 'Hidden' : 'Base'}</h3>
                  <p className='bg-slate-200 rounded-xl p-1 w-[230%] text-center capitalize text-[13px] sm:text-base'>{ability.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <section>
            <ul className='flex justify-center items-center flex-wrap gap-2 sm:gap-5 mt-2'>
              {modalInfo?.stats.map((stat) => (
                <li key={stat.name} className=''>
                  <p className='pb-1 capitalize font-semibold'>{stat.name}</p>
                  <div className={`p-2 rounded-full text-center font-semibold text-white ${getStatColorClass(stat.base_stat)}`}>
                    {stat.base_stat}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className='m-2 h-1/3'>
            <h2 className='text-center font-bold text-xl m-1'>Evolutions</h2>
            <ul className='flex justify-center items-center  gap-2'>
              {modalInfo?.evolves.map((evolv, index) => (
                <div key={evolv.name} className='flex items-center gap-2'>
                  {index !== 0 && <span className='bg-slate-100 rounded-md py-2 px-4 font-semibold'>{<EvolveMethod evolve_method={evolv.evolve_method} happiness={evolv.happiness} min_level={evolv.min_level} />}</span>}
                  <button className='hover:bg-slate-100 rounded-xl' onClick={() => modalOn(evolv.pokemonInfo)}>
                    <img src={evolv.image} alt={evolv.name} />
                  </button>
                </div>
              ))}
            </ul>
          </section>
        </section>
      </article>
    </section>
  )
}
