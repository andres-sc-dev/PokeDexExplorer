//muestro la ficha del pokemon con su imagen, tipos, altura, peso y estadisticas

import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../components/StatusMessage';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from '../constants/pokemonData';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { capitalize, formatNumber } from '../utils/format';

//recibo el nombre o numero del pokemon que seleccione o busque
export default function PokemonDetailScreen({ query, onBack }) {
  const { pokemon, status, retry } = usePokemonDetail(query);

  //uso el mismo boton para volver a la lista en todos los estados
  const backButton = <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />;

  //muestro un mensaje mientras carga la ficha
  if (status === 'loading') {
    return <LoadingMessage text="Cargando ficha..." />;
  }

  //muestro un mensaje si no existe el pokemon buscado
  if (status === 'notFound') {
    return (
      <EmptyMessage message={'No encontramos ningún Pokémon con "' + query + '".'}>
        {backButton}
      </EmptyMessage>
    );
  }

  //muestro un mensaje si ocurre un error al cargar la ficha
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

  //cuando carga bien la ficha, uso el color del primer tipo del pokemon
  const mainColor = TYPE_COLORS[pokemon.types[0]] || DEFAULT_TYPE_COLOR;

  return (
    <ScrollView style={{ backgroundColor: mainColor }} contentContainerStyle={styles.content}>
      {/*muestro el numero, el nombre y la imagen en el encabezado*/}
      <View style={[styles.header, { backgroundColor: mainColor }]}>
        <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
      </View>

      {/*esta tarjeta blanca queda un poco encima del encabezado*/}
      <View style={styles.body}>
        {/*muestro los tipos del pokemon*/}
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measureBox}>
            <Text style={styles.measureLabel}>Altura</Text>
            <Text style={styles.measureValue}>{pokemon.heightInMeters} m</Text>
          </View>
          <View style={styles.measureBox}>
            <Text style={styles.measureLabel}>Peso</Text>
            <Text style={styles.measureValue}>{pokemon.weightInKg} kg</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        <View style={styles.stats}>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} color={mainColor} />
          ))}
        </View>

        <View style={styles.backContainer}>{backButton}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
  },
  number: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 8,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    padding: 20,
    paddingTop: 24,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  measures: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  measureBox: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  measureLabel: {
    fontSize: 13,
    color: '#888',
  },
  measureValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
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