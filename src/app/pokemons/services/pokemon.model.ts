export interface PokemonShort {
  id: number;
  name: string;
}

export interface Pokemon {
    id: number,
    name: string,
    description: string,
    height: number,
    weight: number,
    types: string[]
}

export interface PageData {
    offset: number,
    limit: number,
    data : PokemonShort[]
}