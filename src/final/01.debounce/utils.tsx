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
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000&${search}`);
    if (!response.ok) {
        return Promise.reject(`Error: ${response.status} ${response.statusText}`);
    }
    const dataFiltered = (await response.json()).results.filter((pokemon: Pokemon) => pokemon.name.includes(search));
    return dataFiltered as Promise<Array<Pokemon>>;
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    delay: number
) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
