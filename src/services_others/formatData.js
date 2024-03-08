import { getEvolutionsData } from "./pokeServices";

export function formatStats (stats){
    return stats.map((stat)=> ({name: stat.stat.name, base_stat: stat.base_stat}))
}

export function formatTypes(types){
    return types.map(({type})=>type.name)
}

export function formatAbilities(abilities){
    return abilities.map((ability)=>({name: ability.ability.name, hidden: ability.is_hidden}))
}

export function formatDescription(description){
    return description.flavor_text_entries[1].flavor_text.replace(/\f/g, ' ')
}

export function getSprite(sprites){
    return sprites.versions["generation-v"]["black-white"].animated.front_default ?? sprites.versions["generation-v"]["black-white"].front_default
}

export async function formatEvolves(evolutions){
    const evolves = []
    let evolveInfo = evolutions.chain
    do{
        const evolvesDetails = evolveInfo.evolution_details[0]
        evolves.push({
            name: evolveInfo.species.name,
            min_level: evolvesDetails?.min_level ?? 1,
            happiness: evolvesDetails?.min_happiness ? true : false,
            evolve_method: evolvesDetails?.trigger.name ?? "base"
        })
        evolveInfo = evolveInfo.evolves_to[0]
    }while(evolveInfo)

    const promisesEvolution = getEvolutionsData(evolves)
    
    try{
       const evolutionsData = await Promise.allSettled(promisesEvolution)
       infoEvolutions(evolutionsData, evolves)

    }catch(e){
        console.error(e)
    }

    return evolves
}

function infoEvolutions(data, evolutions){
    data.forEach((evoData, index)=>{
        if(evoData.status === 'fulfilled'){
        evolutions[index].image = evoData.value.data.sprites.versions["generation-v"]["black-white"].front_default
        evolutions[index].pokemonInfo = evoData.value.data
    }
    })
}