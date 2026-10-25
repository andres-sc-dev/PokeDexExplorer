//funciones pequeñas para dar formato a los datos que llegan de la API

//"pikachu" -> "Pikachu"
export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

//25 -> "#025"  (número con 3 dígitos, ceros a la izquierda)
export function formatNumber(id) {
  return '#' + String(id).padStart(3, '0');
}

//la lista de la API solo trae la URL, por ejemplo:
//"https://pokeapi.co/api/v2/pokemon/25/"  ->  25
//hay que quitar el "/" del final y tomar el ultimo pedazo
export function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean); // filter(Boolean) borra los vacios
  return Number(parts[parts.length - 1]);
}

//imagen para las tarjetas de la lista, sin pedir la ficha completa
export function getArtworkUrl(id) {
  return (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
    id +
    '.png'
  );
}