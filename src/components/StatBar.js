//muestro una estadistica del pokemon con su nombre, valor y una barra

import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT_VALUE, STAT_NAMES_ES } from '../constants/pokemonData';

export default function StatBar({ name, value, color = '#E3350D' }) {
  //calculo que porcentaje representa el valor de la estadistica
  //limito la barra al 100% por si algun valor supera el maximo
  const percentage = Math.min((value / MAX_STAT_VALUE) * 100, 100);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_NAMES_ES[name] || name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        {/*el ancho de la barra depende del porcentaje que calcule*/}
        <View style={[styles.fill, { width: percentage + '%', backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    width: 110,
    color: '#444',
  },
  value: {
    width: 36,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 8,
  },
  track: {
    flex: 1,
    height: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});