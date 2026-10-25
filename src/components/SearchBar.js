//barra de busqueda: un textinput y un boton de buscar
//es un componente tapadito: no sabe nada de la API, solo avisa lo que escribe el usuario

import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, onSearch }) {
  return (
    <View style={styles.container}>
      {/*concepto: textinput controlado, su valor viene de un useState del padre*/}
      <TextInput
        style={styles.input}
        placeholder="Busca por nombre o número..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch} //tambien busca con la tecla enter del teclado
        autoCapitalize="none" //que el teclado no ponga mayuscula automatica
        autoCorrect={false} //ni autocorrija los nombres
        returnKeyType="search"
      />
      <Button title="Buscar" onPress={onSearch} color="#E3350D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
});