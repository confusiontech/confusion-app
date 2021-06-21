import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base';

export default function FilterGrid({ elements, selectedElementIds, setSelectedElementIds }) {
  const buttonsPerRow = 3;

  const elementsToRender = elements.map(element => ({
    ...element,
    selected: selectedElementIds.includes(element.value)
  })
  );
  const [items, setItems] = useState(elementsToRender);

  const maxWidthPcnt = (0.999 * 100 / buttonsPerRow) + '%';

  // Creo que es imposible usar FlatList con dimensiones proporcionales, el % se aplica
  // siempre dos veces, y acabamos con filas de altura correcta, pero botones demasiado
  // pequeños...
  // Así que para que nos quepa el filtro en pantalla usamos valores absolutos, pero calculados
  // en base a las dimensiones de la pantalla.
  // TODO: probar `columnWrapperStyle={{ flexWrap: 'wrap', flex: 1}}`
  const buttonHeight = Dimensions.get('window').height * 0.11;

  const toggleSelect = item => {
    const selectedItemIds = [];
    const modifiedItems = items.map(i => {
      if (item.value === i.value) {
        i.selected = !i.selected;
      }
      if (i.selected) selectedItemIds.push(i.value);
      return i;
    });
    setItems(modifiedItems);
    setSelectedElementIds(selectedItemIds);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        onPress={() => toggleSelect(item)}
        style={[item.selected ? styles.selected : styles.normal,
          {
            maxWidth: maxWidthPcnt,
            height: buttonHeight
          }]}
      >
        <Button
          transparent
          onPress={() => toggleSelect(item)}
          style={styles.filterButton}
        >
          <Text style={{ textAlign: 'center' }}>{item.label}</Text>
        </Button>
      </View>
    );
  };

  const extractKey = item => item.value;

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={{}}
        numColumns={buttonsPerRow}
        data={items}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
    </View>
  );
}

const generalBoxStyle = {
  flex: 1,
  borderWidth: 1,
  marginRight: 0,
  justifyContent: 'center',
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const styles = StyleSheet.create({
  flatList: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    marginLeft: 3,
    marginRight: 3
  },
  selected: {
    ...generalBoxStyle,
    backgroundColor: 'yellow'
  },
  normal: {
    ...generalBoxStyle
  },
  filterButton: {
    height: '100%',
    justifyContent: 'center'
  }
});
