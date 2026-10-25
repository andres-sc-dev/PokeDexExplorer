//componentes para los estados de la interfaz: cargando, error y sin resultados
//los reutilizo en la lista y en la ficha para no repetir codigo

import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

//estado cargando: indicador de carga + texto
export function LoadingMessage({ text = 'Cargando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E3350D" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

//estado error: mensaje claro en español + boton "reintentar"
export function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      <Button title="Reintentar" onPress={onRetry} color="#E3350D" />
    </View>
  );
}

//estado sin resultados: se usa cuando el nombre buscado no existe
export function EmptyMessage({ message, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#B00020',
    textAlign: 'center',
  },
});