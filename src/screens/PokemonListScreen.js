//vista de lista: titulo, buscador y cuadrícula de 2 columnas con scroll infinito

import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { ErrorMessage, LoadingMessage } from '../components/StatusMessage';
import usePokemonList from '../hooks/usePokemonList';

//onSelectPokemon: avisa a App que pokemon se quiere ver (por id o por texto buscado)
export default function PokemonListScreen({ onSelectPokemon }) {
  const { pokemon, loading, error, loadMore, retry } = usePokemonList();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const clean = searchText.trim().toLowerCase(); //ignora mayusculas y espacios
    if (clean === '') return; //si no escribio nada, pues nada se hace
    onSelectPokemon(clean);
  };

  //estados cuando todavia no hay ningun pokemon en pantalla
  const isFirstLoad = pokemon.length === 0;

  // pie de la lista: indicador mientras carga mas, o error con "reintentar"
  const renderFooter = () => {
    if (loading && !isFirstLoad) {
      return <ActivityIndicator style={styles.footer} size="small" color="#E3350D" />;
    }
    if (error && !isFirstLoad) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerError}>No se pudieron cargar más Pokémon.</Text>
          <Button title="Reintentar" onPress={retry} color="#E3350D" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>

      <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

      {/*estados de la primera carga*/}
      {isFirstLoad && loading && <LoadingMessage text="Cargando Pokémon..." />}
      {isFirstLoad && error && (
        <ErrorMessage
          message="No se pudo conectar con la PokéAPI. Revisa tu internet."
          onRetry={retry}
        />
      )}

      {/*estado exito: la lista*/}
      {!isFirstLoad && (
        //concepto: flatList en vez de ScrollView + map para listas largas
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)} //clave unica por elemento
          numColumns={2} //cuadricula de 2 columnas
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelectPokemon} />}
          onEndReached={loadMore} //scroll infinito: al llegar al final pide 20 mas
          onEndReachedThreshold={0.5} //empieza a cargar cuando falta media pantalla
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E3350D',
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  footer: {
    marginVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  footerError: {
    color: '#B00020',
  },
});