import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";
import { GiRuneStone } from "react-icons/gi";
import { IoHeart } from "react-icons/io5";

function EvolveMethod({ evolve_method, happiness, min_level }) {
    return (
        <>
            {evolve_method == 'trade' ? <FaExchangeAlt className='text-2xl' /> : evolve_method == 'use-item' ? <GiRuneStone className='text-2xl' /> : happiness ? <IoHeart className='text-2xl' /> : min_level}
        </>
    )
}

export default EvolveMethod