import { useEffect, useState } from "react";
import { getSearchResult, type Pokemon } from "./utils";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

	const Row = ({ index, style }: ListChildComponentProps) => {
		const pokemon = pokeData[index];
		return (
			<div style={style} className="p-2 border-b border-gray-200"
				key={pokemon ? pokemon.id : index}>
				{pokemon ? (
					<div className="flex items-center space-x-2">
						<img
							src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
							alt={pokemon.name}
						/>
						<span className="font-bold">{pokemon.name}</span>
						<span className="text-gray-500">#{pokemon.id}</span>
					</div>
				) : (
					<span className="text-gray-500">Loading...</span>
				)}
			</div>
		);
	};
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
				<div className="flex-1 min-h-0 mt-4">
					<AutoSizer>
						{({ height, width }) => (
							<List
								height={height}
								width={width}
								itemCount={pokeData.length}
								itemSize={45}
							>
								{Row}
							</List>
						)}
					</AutoSizer>
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
