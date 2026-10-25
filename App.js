//este es el punto de entrada y aqui decido si mostrar la lista o la ficha del pokemon
//las peticiones y los estilos de cada pantalla estan en src

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PokemonListScreen from './src/screens/PokemonListScreen';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen';

export default function App() {
  //guardo cual pokemon se esta viendo en el detalle
  //si es null significa que estoy en la lista
  const [selectedQuery, setSelectedQuery] = useState(null);

  return (
    <SafeAreaProvider>
      {/*uso SafeAreaView para que el contenido no quede debajo de la barra de estado*/}
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {/*dejo la lista montada y solo la oculto cuando abro un pokemon
            asi no pierdo el scroll ni tengo que volver a cargar los pokemon de la api*/}
        <View style={[styles.flex, selectedQuery !== null && styles.hidden]}>
          <PokemonListScreen onSelectPokemon={setSelectedQuery} />
        </View>

        {selectedQuery !== null && (
          <PokemonDetailScreen query={selectedQuery} onBack={() => setSelectedQuery(null)} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  flex: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});