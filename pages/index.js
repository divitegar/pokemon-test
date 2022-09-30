import { useState } from "react";

import Link from "next/link";

export default function Home({ mockPokemon, types }) {
  const [filter, setFilter] = useState(mockPokemon);

  const filterType = (type) => {
    setFilter(mockPokemon);

    let filterByType = mockPokemon
      .filter((pokemon) =>
        pokemon.types.some((item) => item.type.name === type)
      )
      .map((filterItem) => {
        let filters = { ...filterItem };

        return filters;
      });
    setFilter(filterByType);
  };
  console.log(filter);

  return (
    <div className="mt-10 mx-20">
      <div className="flex overflow-auto mt-3 pb-4 ml-3">
        {types.map((type, index) => (
          <div
            key={index}
            className="rounded-xl bg-slate-800 text-white px-6 py-2 w-32 h-auto mr-3 cursor-pointer"
            onClick={() => filterType(type.name)}
          >
            {type.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-5">
        {filter
          ? filter.map((item, index) => (
              <Link key={index} href={`/pokemon/${item.name}`}>
                <div className="bg-gray-600 text-white p-3 rounded-lg border-neutral-700 cursor-pointer">
                  <div>{item?.name}</div>
                  <div>{item?.types?.[0]?.type?.name}</div>
                  <img
                    src={item?.sprites}
                    alt={item?.name}
                    className="w-32 h-20"
                  />
                </div>
              </Link>
            ))
          : "Not Found"}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const resTypes = await fetch("https://pokeapi.co/api/v2/type");
  const types = await resTypes.json();

  const listPokemon = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}?limit=101&offset=0/`
    );
    const data = await response.json();

    return data;
  };
  let pokemons = [];
  for (let i = 1; i <= 101; i++) {
    let data = await listPokemon(i);
    pokemons.push(data);
  }

  let mockPokemon = pokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
  });

  return {
    props: {
      types: types.results,
      mockPokemon,
    },
  };
}
