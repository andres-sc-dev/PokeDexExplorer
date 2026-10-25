//arquitextura: este archivo es la unica parte de la app que habla con la red
//los componentes y las pantallas nunca llaman a fetch directamente, solo usan
//las funciones que se exportan aquí. Así la logica de red queda separada del
//JSX y de los estilos.

import { getArtworkUrl, getIdFromUrl } from '../utils/format';

const BASE_URL = 'https://pokeapi.co/api/v2';

//función privada que hace el fetch y revisa si la respuesta salió bien
//concepto: fetch con async/await
async function request(path) {
  const response = await fetch(BASE_URL + path);

  //concepto: revisar response.ok ANTES de response.json()
  //si el nombre no existe la API responde 404 con texto plano (no JSON),
  //entonces response.json() reventaría, por eso se revisa antes
  if (!response.ok) {
    const error = new Error('HTTP error ' + response.status);
    // guardo el código para distinguir el 404
    error.status = response.status; 
    throw error;
  }

  return response.json();
}

//trae una pagina de la lista
//ejemplo: getPokemonPage(20, 0) -> los primeros 20
export async function getPokemonPage(limit, offset) {
  const data = await request('/pokemon?limit=' + limit + '&offset=' + offset);

  //convertimos cada resultado a un objeto más cómodo para la interfaz:
  //la API solo da { name, url }, así que sacamos el id de la url
  return data.results.map((item) => {
    const id = getIdFromUrl(item.url);
    return {
      id: id,
      name: item.name,
      image: getArtworkUrl(id),
    };
  });
}

//trae la ficha de un Pokémon por nombre o por número
export async function getPokemonDetail(query) {
  //la API necesita el nombre en minusculas y sin espacios al final
  const cleanQuery = String(query).trim().toLowerCase();

  const data = await request('/pokemon/' + cleanQuery);

  //dejamos solo los campos que usa la app (la respuesta real es enorme)
  return {
    id: data.id,
    name: data.name,
    // height viene en decímetros y weight en hectogramos -> dividir entre 10
    heightInMeters: data.height / 10,
    weightInKg: data.weight / 10,
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    image: data.sprites.other['official-artwork'].front_default,
  };
}