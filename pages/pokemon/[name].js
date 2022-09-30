import React from "react";

import Link from "next/link";

export default function Pokemon({ data }) {
  console.log(data);
  return (
    <div className="bg-gray-700 h-screen">
      <Link href="/">
        <div className="bg-gray-700 text-white p-3 rounded-lg">Home</div>
      </Link>
      <div className="bg-white px-5 rounded-lg mx-3 md:mx-[400px]">
        <div className="flex justify-start">
          <img
            src={data?.sprites?.front_default}
            alt={data?.name}
            className="w-56 h-auto object-cover"
          />
          <div className="grid grid-cols-1 justify-start items-center h-full pt-3">
            <p>
              Name: <strong>{data?.name}</strong>
            </p>
            <p>
              Ability: <strong>{data?.abilities?.[0]?.ability?.name}</strong>
            </p>
            <p>
              Type: <strong>{data?.types?.[0]?.type?.name}</strong>
            </p>
            <p>
              Height: <strong>{data?.height}</strong>
            </p>
            <p>
              Weight: <strong>{data?.weight}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
