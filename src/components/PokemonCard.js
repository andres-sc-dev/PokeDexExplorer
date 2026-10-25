//tarjeta de un pokemon en la cuadricula: imagen, numero y nombre

import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { CARD_COLORS } from '../constants/pokemonData';
import { capitalize, formatNumber } from '../utils/format';

const GRID_PADDING = 12; //espacio a los lados de la cuadricula
const CARD_MARGIN = 6; //espacio alrededor de cada tarjeta

export default function PokemonCard({ pokemon, onPress }) {
  //calculo el ancho para que quepan exactamente 2 columnas en cualquier pantalla
  //(asi la ultima tarjeta no se estira cuando la cantidad de pokemon es impar)
  const { width } = useWindowDimensions();
  const cardWidth = (width - GRID_PADDING * 2) / 2 - CARD_MARGIN * 2;
  const imageSize = cardWidth - 24;

  //el color de fondo se repite segun el id: 1 -> segundo color, 2 -> tercero...
  const backgroundColor = CARD_COLORS[pokemon.id % CARD_COLORS.length];

  return (
    //concepto: Pressable permite cambiar el estilo mientras esta presionado (pressed),
    //touchableopacity solo baja la opacidad y no deja personalizarlo
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth, backgroundColor, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={() => onPress(pokemon.id)}
    >
      {/*circulo blanco translucido detras de la imagen*/}
      <View
        style={[
          styles.imageCircle,
          { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
        ]}
      >
        {/*concepto: Image remota -> necesita width y height explicitos o no se ve*/}
        <Image
          source={{ uri: pokemon.image }}
          style={{ width: imageSize * 0.9, height: imageSize * 0.9 }}
          resizeMode="contain"
        />
      </View>
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
    borderRadius: 20,
    elevation: 2, //sombra en android
    shadowColor: '#000', //sombra en ios
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
});