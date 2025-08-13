import { useMemo, useState } from "react";
import { debounce, getSearchResult, type Pokemon } from "./utils";

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

	// Create a debounced version of fetchPokemon
	const debouncedFetch = useMemo(() => debounce(fetchPokemon, 1500), []);

	const handleInputChange = (value: string) => {
		setSearch(value);
		debouncedFetch(value);
	};

	return (
		<div className="min-h-screen py-8 px-4">
			<input
				type="text"
				placeholder="Type something..."
				className="border p-2 rounded w-full"
				value={search}
				onChange={(e) => handleInputChange(e.target.value)}
			/>
			{pokeData.length > 0 ? (
				<ul className="mt-4 space-y-2">
					{pokeData.map((pokemon) => (
						<li key={pokemon.id} className="p-2 border rounded">
							<div className="flex items-center space-x-2">
								<span className="font-bold">{pokemon.name}</span>
								<span className="text-gray-500">#{pokemon.id}</span>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-4 text-gray-500">No Pokémon found.</p>
			)}
		</div>
	);
}
