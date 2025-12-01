import { Pokemon } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";



const getColorByType = (type: string) => {
  switch (type) {
    case "grass":
      return "#7AC74C";
    case "fire":  // 火                   
      return "#EE8130";
    case "water": // 水
      return "#6390F0";
    case "bug": // 虫
      return "#A6B91A";
    default:
      return "#A8A77A";
  }
}
export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

console.log(JSON.stringify(pokemons[0], null, 2));
useEffect(() => {
  // fetch pokemons
  fetchPokemons();
}, []);

const fetchPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
    const data = await response.json();

    const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
    );

    console.log(detailedPokemons);


    setPokemons(detailedPokemons);
  } catch (error) {
    console.log(error);
  }
}

  return (
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16,
    }} >
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name} href={{ pathname: "/details", params: { name: pokemon.name } }} style={{ backgroundColor: getColorByType(pokemon.types[0].type.name) + 50, padding: 20, borderRadius: 20}}>
        <View className="flex flex-col items-center justify-center">
          <Text className="text-red-500 text-2xl font-bold text-center mt-10">{pokemon.name}</Text>
          <Text className="text-red-500 text-xl font-bold text-center mt-5">{pokemon.types[0].type.name}</Text>


          <View className="flex flex-row items-center justify-center">
            <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} className="w-40 h-40 mt-10" />
            <Image source={{ uri: pokemon.imageBack }} style={{ width: 150, height: 150 }} className="w-40 h-40 mt-10" />
          </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}
