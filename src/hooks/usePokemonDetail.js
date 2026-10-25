//hook que trae la ficha de un pokemon segun el texto, nombre o numero, que le pasemos

import { useEffect, useState } from 'react';
import { getPokemonDetail } from '../services/pokemonApi';

export default function usePokemonDetail(query) {
  const [pokemon, setPokemon] = useState(null);
  //status puede ser: 'loading' o 'success' o 'notfound' o 'error'
  const [status, setStatus] = useState('loading');
  //cada vez que se pulsa reintentar este numero sube y el efecto vuelve a correr
  const [attempt, setAttempt] = useState(0);

  //concepto: useEffect con dependencias [query, attempt]
  //la peticion se repite solo cuando cambia el pokemon buscado o cuando
  //el usuario pulsa reintentar. no depende de nada mas, asi no hay bucle infinito
  useEffect(() => {
    //este flag evita guardar un resultado viejo si el usuario ya salio de la ficha
    //(o busco otra cosa) antes de que terminara la peticion
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const data = await getPokemonDetail(query);
        if (cancelled) return;
        setPokemon(data);
        setStatus('success');
      } catch (e) {
        if (cancelled) return;
        //404 = ese nombre/numero no existe -> estado "sin resultados"
        //cualquier otro fallo sea sin internet, servidor caido dara de1 estado error
        setStatus(e.status === 404 ? 'notFound' : 'error');
      }
    }

    load();

    //funcion de limpieza: se ejecuta antes de que el efecto vuelva a correr
    //o cuando el componente se desmonta
    return () => {
      cancelled = true;
    };
  }, [query, attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { pokemon, status, retry };
}