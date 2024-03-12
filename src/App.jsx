import PokeList from "./components/PokeList.jsx"
import { SearchForm } from "./components/SearchForm.jsx"
import { FiltersProvider } from './context/filters.jsx';
import { ModalProvider } from "./context/modal.jsx";
import PokeInfoModal from "./components/PokeInfoModal.jsx";
import useGetPokeData from "./hooks/useGetPokeData.js";
import Favorites from "./components/Favorites.jsx";

function App() {
  const pokemonsList = useGetPokeData('https://pokeapi.co/api/v2/pokemon?limit=386')

  return (
    <main className='max-w-[1400px] mx-auto p-2 h-full mb-5'>
      <ModalProvider>
      <Favorites />
        <FiltersProvider>
          <SearchForm />
          <PokeList pokeData={pokemonsList} />
        </FiltersProvider>
        <PokeInfoModal />
      </ModalProvider>
    </main>
  )
}

export default App
