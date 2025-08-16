export type Pokemon = {
    name: string;
    id: number;
    image: string; // Optional image URL for the Pokémon
    abilities: Array<{
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }>;
};

export async function getSearchResult(search: string, delay?: number): Promise<Array<Pokemon>> {
    const param = new URLSearchParams({ q: search });
    if (delay) {
        param.set('deplay', delay.toString());
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&${search}`);
    if (!response.ok) {
        return Promise.reject(`Error: ${response.status} ${response.statusText}`);
    }
    const dataFiltered = (await response.json()).results.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    return dataFiltered as Promise<Array<Pokemon>>;
}
