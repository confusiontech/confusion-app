import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, 
  TouchableWithoutFeedback } from 'react-native';
import { Button } from 'native-base';


export default function FilterGrid({ elements, selectedElementIds, setSelectedElementIds }) {
  const elementsToRender = elements.map(element => ({
      ...element,
      selected: selectedElementIds.includes(element.value),
    })
  )
  const [items, setItems] = useState(elementsToRender);

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
    return  (
      <View
        onPress={() => toggleSelect(item)}
        style={[item.selected ? styles.selected : styles.normal]}
      >
        <Button
          transparent
          onPress={() => toggleSelect(item)}
          style={styles.filterButton}
        >
          <Text style={{textAlign:'center'}}>{item.label}</Text>
        </Button>
      </View>
    )
  }

  const extractKey = item => item.value;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={{}}
        numColumns={3}
        data={items}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
    </View>
  );
}

const generaBoxStyle = {
  flex: 1,
  height: 70,
  borderWidth: 1,
  marginRight: 0,
  justifyContent: 'center',
  maxWidth: '33.33%',
  borderLeftWidth:0,
  borderTopWidth:0,
}

const styles = StyleSheet.create({
  flatList: {
    borderTopWidth:1,
    borderLeftWidth: 1,
    marginLeft: 3,
    marginRight: 3,
  },
  selected: {
    ...generaBoxStyle,
    backgroundColor: 'yellow',
  },
  normal: {
    ...generaBoxStyle,
  },
  filterButton:{
    height: '100%',
    justifyContent: 'center',
  }
});
