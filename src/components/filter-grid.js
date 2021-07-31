import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base';

import { BUTTON_ACTIVE_COLOR } from '../styles/colors';

const BUTTONS_PER_ROW = 3;

const renderItem = ({ item, textStyle, onClick, buttonsPerRow }) => {
  const maxWidthPcnt = (0.999 * 100 / buttonsPerRow) + '%';
  const buttonHeight = Dimensions.get('window').height * 0.11;
  const finalTextStyle = {
    textAlign: 'center',
    ...textStyle
  };

  return (
    <View
      style={[item.selected ? styles.selected : styles.normal,
        {
          maxWidth: maxWidthPcnt,
          height: buttonHeight
        }]}
    >
      <Button
        transparent
        onPress={onClick}
        style={styles.filterButton}
      >
        <Text style={finalTextStyle}>{item.label}</Text>
      </Button>
    </View>
  );
};

export default function FilterGrid({
  elements,
  selectedElementIds,
  setSelectedElementIds,
  contentStyle = {},
  buttonsPerRow = BUTTONS_PER_ROW
}) {
  const elementsToRender = elements.map(element => ({
    ...element,
    selected: selectedElementIds.includes(element.value)
  })
  );
  const [items, setItems] = useState(elementsToRender);

  // Creo que es imposible usar FlatList con dimensiones proporcionales, el % se aplica
  // siempre dos veces, y acabamos con filas de altura correcta, pero botones demasiado
  // pequeños...
  // Así que para que nos quepa el filtro en pantalla usamos valores absolutos, pero calculados
  // en base a las dimensiones de la pantalla.
  // TODO: probar `columnWrapperStyle={{ flexWrap: 'wrap', flex: 1}}`
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

  const extractKey = item => item.value;

  console.log(buttonsPerRow);

  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={{}}
        numColumns={buttonsPerRow}
        data={items}
        renderItem={({ item }) => renderItem({
          item,
          textStyle: contentStyle.text,
          onClick: () => toggleSelect(item),
          buttonsPerRow
        })}
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
  borderTopWidth: 1
};

const styles = StyleSheet.create({
  flatList: {
    borderLeftWidth: 1,
    marginLeft: 3,
    marginRight: 3
  },
  selected: {
    ...generalBoxStyle,
    backgroundColor: BUTTON_ACTIVE_COLOR
  },
  normal: {
    ...generalBoxStyle
  },
  filterButton: {
    height: '100%',
    justifyContent: 'center'
  }
});
