import { useEffect, useState } from "react";
import { getSearchResult, type Pokemon } from "./utils";

export default function App() {
	const [search, setSearch] = useState("");
	const [pokeData, setPokeData] = useState<Array<Pokemon>>([]);

	const fetchPokemon = async (value: string) => {
		try {
			const data = await getSearchResult(value);
			setPokeData(data);
		} catch (error) {
			console.error("Error fetching Pokémon data:", error);
		}
	};

	useEffect(() => {
		fetchPokemon(search);
	}, [search]);

	return (
		<div className="h-screen py-4 px-4">
			<div className="h-full flex flex-col">
				<input
					type="text"
					placeholder="Type something..."
					className="border p-2 rounded w-full"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="flex-1 mt-4 overflow-auto">
					{
						pokeData.length > 0 ? pokeData.map((pokemon) => (
							<div key={pokemon.id} className="p-2 border-b border-gray-200">
								<div className="flex items-center space-x-2">
									<img
										src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
										alt={pokemon.name}
										className="w-8 h-8"
									/>
									<span className="font-bold">{pokemon.name}</span>
									<span className="text-gray-500">#{pokemon.id}</span>
								</div>
							</div>
						)) : (
							<div className="p-2 text-gray-500">No Pokémon found</div>
						)
					}
				</div>
				<div>
					<p className="text-gray-500 mt-4">
						Total Pokémon: {pokeData.length}
					</p>
				</div>
			</div>
		</div>
	);
}
