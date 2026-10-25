//hook con la logica de la lista: carga inicial, scroll infinito y errores
//arquitectura: la pantalla solo pinta lo que este hook le entrega

import { useCallback, useEffect, useRef, useState } from 'react';
import { getPokemonPage } from '../services/pokemonApi';

const PAGE_SIZE = 20; //se cargan 20 por vez

export default function usePokemonList() {
  //concepto: useState (un estado por cada cosa que cambia la interfaz)
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false); //true mientras hay una peticion en curso
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //useref guarda valores que no deben provocar un nuevo render
  //offset: cuantos pokemon llevamos cargados
  //isfetching: evita lanzar dos peticiones a la vez (onendreached dispara varias veces)
  const offset = useRef(0);
  const isFetching = useRef(false);

  const fetchPage = useCallback(async () => {
    try {
      const page = await getPokemonPage(PAGE_SIZE, offset.current);
      setPokemon((previous) => [...previous, ...page]);
      offset.current += PAGE_SIZE;
      if (page.length < PAGE_SIZE) setHasMore(false);
      return true;
    } catch (e) {
      setError(true);
      return false;
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetching.current || !hasMore || error) return;

    isFetching.current = true;
    setLoading(true);
    setError(false);

    try {
      await fetchPage();
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [hasMore, error, fetchPage]); //incluye error para usar su valor actualizado

  const retry = useCallback(async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setLoading(true);
    setError(false);

    try {
      await fetchPage();
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [hasMore, fetchPage]);

  //concepto: useEffect con array de dependencias
  //el array [] vacio hace que esto corra una sola vez, cuando se abre la app
  //si se me olvida el array, el efecto correria en cada render y como
  //loadMore cambia el estado, la peticion se repetiria sin parar
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pokemon, loading, error, loadMore, retry };
}