//muestro la lista de pokemon con el titulo, el buscador y las tarjetas en dos columnas

import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { ErrorMessage, LoadingMessage } from '../components/StatusMessage';
import usePokemonList from '../hooks/usePokemonList';

//le aviso a App cual pokemon quiero ver, usando el id o el nombre que busque
export default function PokemonListScreen({ onSelectPokemon }) {
  const { pokemon, loading, error, loadMore, retry } = usePokemonList();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
  const clean = searchText.trim().toLowerCase(); //quito los espacios y paso el texto a minusculas
    if (clean === '') return; //si no escribio nada, no hago nada
    onSelectPokemon(clean);
    setSearchText(''); //limpio el buscador para cuando vuelva a la lista
    };

  //reviso si todavia no hay pokemon cargados
  const isFirstLoad = pokemon.length === 0;

  //muestro un indicador mientras carga mas pokemon o un boton si ocurre un error
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
        <View style={styles.header}>
            <Text style={styles.title}>PokeDex Explorer</Text>
        </View>
      <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

      {/*muestro los mensajes mientras carga la lista por primera vez*/}
      {isFirstLoad && loading && <LoadingMessage text="Cargando Pokémon..." />}
      {isFirstLoad && error && (
        <ErrorMessage
          message="No se pudo conectar con la PokéAPI. Revisa tu internet."
          onRetry={retry}
        />
      )}

      {/*cuando ya hay pokemon cargados, muestro la lista*/}
      {!isFirstLoad && (
        //uso FlatList porque funciona mejor con listas largas que ScrollView y map
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)} //cada pokemon tiene su propia clave
          numColumns={2} //muestro dos tarjetas por fila
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelectPokemon} />}
          onEndReached={loadMore} //cuando llego al final, carga 20 pokemon mas
          onEndReachedThreshold={0.5} //empieza a cargar cuando queda media pantalla
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