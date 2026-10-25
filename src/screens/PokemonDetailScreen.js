//vista de detalle: imagen grande, tipos, altura, peso y estadisticas base

import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../components/StatusMessage';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { capitalize, formatNumber } from '../utils/format';

//query: nombre o numero del pokemon (viene de la tarjeta tocada o de la busqueda)
export default function PokemonDetailScreen({ query, onBack }) {
  const { pokemon, status, retry } = usePokemonDetail(query);

  //un solo boton de volver, reutilizado en los distintos estados
  const backButton = <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />;

  //estado cargando
  if (status === 'loading') {
    return <LoadingMessage text="Cargando ficha..." />;
  }

  //estado sin resultados (404)
  if (status === 'notFound') {
    return (
      <EmptyMessage message={'No encontramos ningún Pokémon con "' + query + '".'}>
        {backButton}
      </EmptyMessage>
    );
  }

  //estado error
  if (status === 'error') {
    return (
      <View style={styles.flex}>
        <ErrorMessage
          message="No se pudo cargar la ficha. Revisa tu conexión e inténtalo de nuevo."
          onRetry={retry}
        />
        <View style={styles.backContainer}>{backButton}</View>
      </View>
    );
  }

  //estado exito
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />

      <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

      {/*un distintivo por cada tipo*/}
      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>

      <View style={styles.measures}>
        <Text style={styles.measure}>Altura: {pokemon.heightInMeters} m</Text>
        <Text style={styles.measure}>Peso: {pokemon.weightInKg} kg</Text>
      </View>

      <Text style={styles.sectionTitle}>Estadísticas base</Text>
      <View style={styles.stats}>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </View>

      <View style={styles.backContainer}>{backButton}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
  number: {
    color: '#888',
    fontSize: 16,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
  },
  types: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  measures: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  measure: {
    fontSize: 16,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  stats: {
    width: '100%',
  },
  backContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
});