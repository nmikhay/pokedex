import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PropTypes from "prop-types";
import "tailwindcss/tailwind.css"

import BackgroundImage from "../components/ui/BackgroundImage";
import CardsContainer from "../components/ui/CardComponents/CardsContainer";
import SmallCard from "../components/ui/CardComponents/SmallCard";
import Loader from "../components/ui/Loader.js";
import Error from "./errors/Error";
import Pagination from "../components/ui/Pagination";

const pokemonTypes = [
  "normal", "fighting", "flying", "poison", "ground", 
  "rock", "bug", "ghost", "steel", "fire", 
  "water", "grass", "electric", "psychic", "ice", 
  "dragon", "dark", "fairy"
];

function Home({ searchTerm, openBigCard }) {
  const [page, setPage] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  const limit = 100;

  const [typeFilter, setTypeFilter] = useState(null);
  const [sortOption, setSortOption] = useState(null); // New state for sorting
  const [randomPokemon, setRandomPokemon] = useState(null);


  const fetchPokemon = async () => {
    let url = null;

    if (searchTerm) {
      const response = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      return [response.data];
    } else if (typeFilter) {
      const typeResponse = await Axios.get(
        `https://pokeapi.co/api/v2/type/${typeFilter}`
      );
      const pokemonUrls = typeResponse.data.pokemon.map((pokemon) => pokemon.pokemon.url);
      const responses = await Promise.all(pokemonUrls.map((url) => Axios.get(url)));
      return responses.map((res) => res.data);
    } else {
      url = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`;
    }

    const response = await Axios.get(url);
    const { results } = response.data;
    const responses = await Promise.all(results.map((result) => 
      Axios.get(typeFilter ? result.pokemon.url : result.url)
    ));
    return responses.map((res) => res.data);
  };

  const {
    data: fetchedPokemonData,
    isLoading,
    isError,
  } = useQuery(["pokemon", searchTerm, typeFilter, page], fetchPokemon);

  useEffect(() => {
    if (fetchedPokemonData) {
      let sortedData = [...fetchedPokemonData];

      switch (sortOption) {
        case "heightDesc":
          sortedData.sort((a, b) => b.height - a.height);
          break;
        case "heightAsc":
          sortedData.sort((a, b) => a.height - b.height);
          break;
        case "weightDesc":
          sortedData.sort((a, b) => b.weight - a.weight);
          break;
        case "weightAsc":
          sortedData.sort((a, b) => a.weight - b.weight);
          break;
        default:
          break;
      }

      setPokemonData(sortedData);
    }
  }, [fetchedPokemonData, sortOption]);

  const getSprite = useMemo(
    () => (data) => {
      if (data?.id >= 906 && data?.id <= 1008) {
        return data.sprites.other["official-artwork"]["front_default"];
      } else if (data?.id < 1009) {
        return data.sprites.other.home.front_default;
      }
      return null;
    },
    []
  );

  const renderPokemonCard = (pokemon) => {
    const image = getSprite(pokemon);
    return (
      <SmallCard
        height={`${pokemon.height * 10}`}
        id={pokemon.id}
        image={image}
        key={pokemon.id}
        name={pokemon.species.name}
        weight={`${pokemon.weight / 10}`}
        openBigCard={openBigCard}
      />
    );
  };

  const handleTypeFilterClick = (filter) => {
    if (typeFilter === filter) {
      setTypeFilter(null);
    } else {
      setTypeFilter(filter);
    }
    setPage(1);
  };

  const handleSortOptionClick = (option) => {
    if (sortOption === option) {
      setSortOption(null);
    } else {
      setSortOption(option);
    }
  };

  const handleRandomPokemonClick = async () => {
        try {
          const response = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118");
          const totalPokemon = response.data.count;
          const randomPokemonId = Math.floor(Math.random() * totalPokemon) + 1;
          const randomResponse = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
          setRandomPokemon(randomResponse.data);
        } catch (error) {
          console.error("Error fetching random Pokémon:", error);
        }
      };

      return (
        <BackgroundImage>
          <div className="flex">
            <div className="bg-gray-200 p-4 w-64">
              <h3 className="font-bold text-blue-500 mb-2">Types of Pokemon:</h3>
              {pokemonTypes.map((type) => (
                <a
                  key={type}
                  className={`block mb-2 text-blue-500 cursor-pointer hover:font-semibold ${
                    typeFilter === type ? "font-semibold" : ""
                  }`}
                  onClick={() => handleTypeFilterClick(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </a>
              ))}
              <h3 className="font-bold text-blue-500 mt-4">Sort by:</h3>
              <a
                className={`block mb-2 text-blue-500 cursor-pointer hover:font-semibold ${
                  sortOption === "heightDesc" ? "font-semibold" : ""
                }`}
                onClick={() => handleSortOptionClick("heightDesc")}
              >
                Tallest to Shortest
              </a>
              <a
                className={`block mb-2 text-blue-500 cursor-pointer hover:font-semibold ${
                  sortOption === "heightAsc" ? "font-semibold" : ""
                }`}
                onClick={() => handleSortOptionClick("heightAsc")}
              >
                Shortest to Tallest
              </a>
              <a
                className={`block mb-2 text-blue-500 cursor-pointer hover:font-semibold ${
                  sortOption === "weightDesc" ? "font-semibold" : ""
                }`}
                onClick={() => handleSortOptionClick("weightDesc")}
              >
                Heaviest to Lightest
              </a>
              <a
                className={`block mb-2 text-blue-500 cursor-pointer hover:font-semibold ${
                  sortOption === "weightAsc" ? "font-semibold" : ""
                }`}
                onClick={() => handleSortOptionClick("weightAsc")}
              >
                Lightest to Heaviest
              </a>
              <button
                className="block mb-2 text-blue-500 cursor-pointer hover:font-semibold"
                onClick={handleRandomPokemonClick}
              >
                Generate a Random Pokémon
              </button>
              <button
                className="block mb-2 text-red-500 cursor-pointer hover:font-semibold"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
            <div className="ml-4 flex-grow">
              {isLoading ? (
                <Loader />
              ) : isError || !pokemonData ? (
                <Error />
              ) : (
                <>
                  <Pagination
                    page={page}
                    handlePrevClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    handleNextClick={() => setPage((prev) => prev + 1)}
                    handleFirstClick={() => setPage(1)}
                    handleLastClick={() => setPage(11)}
                  />
                  <CardsContainer>
                     {randomPokemon ? (
                      renderPokemonCard(randomPokemon)
                    ) : (
                      pokemonData.map(renderPokemonCard)
                    )}
                  </CardsContainer>
                  <Pagination
                    page={page}
                    handlePrevClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    handleNextClick={() => setPage((prev) => prev + 1)}
                    handleFirstClick={() => setPage(1)}
                    handleLastClick={() => setPage(11)}
                  />
                </>
              )}
        </div>
      </div>
    </BackgroundImage>
  );
}

Home.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func.isRequired,
};

export default Home;








