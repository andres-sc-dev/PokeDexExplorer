//tarjeta de un pokemon en la cuadricula: imagen, numero y nombre

import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { capitalize, formatNumber } from '../utils/format';

const GRID_PADDING = 12; //espacio a los lados de la cuadricula
const CARD_MARGIN = 6; //espacio alrededor de cada tarjeta

export default function PokemonCard({ pokemon, onPress }) {
  //calculo el ancho para que quepan exactamente 2 columnas en cualquier pantalla
  //(asi la ultima tarjeta no se estira cuando la cantidad de pokemon es impar)
  const { width } = useWindowDimensions();
  const cardWidth = (width - GRID_PADDING * 2) / 2 - CARD_MARGIN * 2;

  return (
     //concepto: Pressable es la opcion recomendada frente a TouchableOpacity y permite controlar la respuesta al tacto
    <Pressable
      style={[styles.card, { width: cardWidth }]}
      onPress={() => onPress(pokemon.id)}
    >
      {/*concepto: Image remota -> necesita width y height explicitos o no se ve*/}
      <Image
        source={{ uri: pokemon.image }}
        style={{ width: cardWidth - 24, height: cardWidth - 24 }}
        resizeMode="contain"
      />
      <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: CARD_MARGIN,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2, //sombra en android
    shadowColor: '#000', //sombra en ios
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  number: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
});