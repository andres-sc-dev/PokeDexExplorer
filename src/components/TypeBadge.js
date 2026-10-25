//distintivo de un tipo (fuego, agua, planta...) con su propio color

import { StyleSheet, Text, View } from 'react-native';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS, TYPE_NAMES_ES } from '../constants/pokemonData';

export default function TypeBadge({ type }) {
  //busco el color del tipo; si no existe uso el gris por defecto
  const color = TYPE_COLORS[type] || DEFAULT_TYPE_COLOR;
  const label = TYPE_NAMES_ES[type] || type;

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});