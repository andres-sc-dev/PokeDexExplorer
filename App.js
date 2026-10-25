import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PokemonListScreen from './src/screens/PokemonListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PokemonListScreen
          onSelectPokemon={(id) => console.log(id)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}