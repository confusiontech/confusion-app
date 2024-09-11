import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { iconsMap } from '../helpers/icon-helpers';

import {
  TOUCHABLE_UNDERLAY_COLOR,
  GRID_BUTTON_COLOR,
  GRID_SELECTED_BUTTON_COLOR,
  GRID_TEXT_COLOR,
  GRID_SELECTED_TEXT_COLOR
} from '../styles/colors';

const BUTTONS_PER_ROW = 3;

const renderItem = ({ item, textStyle, onClick, buttonsPerRow, withIcon }) => {
  const maxWidthPcnt = (0.999 * 100 / buttonsPerRow) + '%';
  const buttonHeight = Dimensions.get('window').height * 0.11;
  const itemTextStyle = {
    textAlign: 'center',
    ...textStyle,
    color: GRID_TEXT_COLOR
  };

  if (withIcon) {
    const color = item.selected ? GRID_SELECTED_TEXT_COLOR : GRID_TEXT_COLOR;
    const iconStyle = { size: 16, color, styleClass: styles.icon };

    if (item.value === 'fusion') {
      item = {
        ...item,
        label: (
          < >
            <Text> {iconsMap.get(item.value, { ...iconStyle, size: 18 })}  </Text>
            <Text style={{ fontSize: 18, marginLeft: 18 }}> {item.label} </Text>
          </>
        )
      };
    } else {
      item = {
        ...item,
        label: (
          <Text>
            {iconsMap.get(item.value, iconStyle)}
            {'\n'}
            {item.label}
          </Text>
        )
      };
    }
  }

  const finalTextStyle = item.selected ? { ...itemTextStyle, color: GRID_SELECTED_TEXT_COLOR } : itemTextStyle;

  const itemStyle = styles[`itemStyle${item.value}`] || {};

  return (
    <View
      style={[item.selected ? styles.selected : styles.normal,
        {
          maxWidth: maxWidthPcnt,
          height: buttonHeight,
          ...itemStyle
        }]}
    >
      <TouchableHighlight
        onPress={onClick}
        style={styles.filterButton}
        activeOpacity={0.9}
        underlayColor={TOUCHABLE_UNDERLAY_COLOR}
      >
        <Text style={finalTextStyle}>{item.label}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default function FilterGrid({
  elements,
  selectedElementIds,
  setSelectedElementIds,
  contentStyle = {},
  buttonsPerRow = BUTTONS_PER_ROW,
  withIcon
}) {
  const elementsToRender = elements.map(element => {
    const selected = selectedElementIds.includes(element.value);
    return {
      ...element,
      selected
    };
  });

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

  return (
    <View style={{ marginBottom: 20, ...contentStyle.gridContainer }}>
      <FlatList
        contentContainerStyle={styles.flatList}
        numColumns={buttonsPerRow}
        data={items}
        renderItem={({ item }) => renderItem({
          item,
          textStyle: contentStyle.text,
          onClick: () => toggleSelect(item),
          buttonsPerRow,
          withIcon
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
    backgroundColor: GRID_SELECTED_BUTTON_COLOR
  },
  normal: {
    ...generalBoxStyle,
    backgroundColor: GRID_BUTTON_COLOR
  },
  filterButton: {
    height: '100%',
    justifyContent: 'center'
  },
  itemStylefusion: {
    maxWidth: '100%'
  },
  icon: {
    textAlign: 'center'
  }
});
