import React from 'react';
import { Feather, FontAwesome5, MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';

const values = new Map([
  ['0', ({ size, color, styleClass }) => <FontAwesome5 name='theater-masks' size={size} color={color} style={styleClass} key='theater-masks' />],
  ['1', ({ size, color, styleClass }) => <MaterialCommunityIcons name='spray' size={size} color={color} style={styleClass} key='spray' />],
  ['2', ({ size, color, styleClass }) => <AntDesign name='videocamera' size={size} color={color} style={styleClass} key='videocamera' />],
  ['3', ({ size, color, styleClass }) => <AntDesign name='picture' size={size} color={color} style={styleClass} key='picture' />],
  ['4', ({ size, color, styleClass }) => <Feather name='music' size={size} color={color} style={styleClass} key='music' />],
  ['5', ({ size, color, styleClass }) => <FontAwesome5 name='lightbulb' size={size} color={color} style={styleClass} key='lightbulb' />],
  ['6', ({ size, color, styleClass }) => <FontAwesome5 name='feather-alt' size={size} color={color} style={styleClass} key='feather-alt' />],
  // ['7', ({ size, color, styleClass }) => <Ionicons name='ios-people' size={size} color={color} style={styleClass} key='ios-people' />],
  ['7', ({ size, color, styleClass }) => <FontAwesome5 name='shapes' size={size} color={color} style={styleClass} key='shapes' />],
  ['8', ({ size, color, styleClass }) => <FontAwesome5 name='building' size={size} color={color} style={styleClass} key='building' />],
  ['favorites', ({ size, color, styleClass }) => <FontAwesome5 name='heart' size={size} color={color} style={styleClass} key='heart' />],
  ['favorites-chosen', ({ size, color, styleClass }) => <FontAwesome5 name='heart' size={size} color={color} style={styleClass} solid key='hearth' />],
  ['external-link', ({ size, color, styleClass }) => <FontAwesome5 name='external-link-alt' size={size} color={color} style={styleClass} solid key='external-link-alt' />],
  ['filter', ({ size, color, styleClass }) => <Ionicons name='funnel' size={size} color={color} style={styleClass} key='funnel' />],
  ['now', ({ size, color, styleClass }) => <FontAwesome5 name='clock' size={size} color={color} style={styleClass} solid key='clock' />],
  ['search', ({ size, color, styleClass }) => <FontAwesome5 name='search' size={size} color={color} style={styleClass} solid key='search' />],
  ['map', ({ size, color, styleClass }) => <FontAwesome5 name='map-marked-alt' size={size} color={color} style={styleClass} solid key='map-marked-alt' />],
  ['directions', ({ size, color, styleClass }) => <FontAwesome5 name='directions' size={size} color={color} style={styleClass} solid key='directions' />],
  ['book', ({ size, color, styleClass }) => <FontAwesome5 name='book-open' size={size} color={color} style={styleClass} solid key='book-open' />],
  ['space', ({ size, color, styleClass }) => <Entypo name='location' size={19} color={color} style={styleClass} solid key='location' />],
  ['info', ({ size, color, styleClass }) => <FontAwesome5 name='info-circle' size={size} color={color} style={styleClass} solid key='info-circle' />],
  // ['fusion', ({ size, color, styleClass }) => <Entypo name='network' size={size} color={color} style={styleClass} solid key='network' />],
  ['fusion', ({ size, color, styleClass }) => <FontAwesome5 name='users' size={size} color={color} style={styleClass} solid key='users' />],
  ['instagram', ({ size, color, styleClass }) => <FontAwesome5 name='instagram' size={size} color={color} style={styleClass} solid key='instagram' />],
  ['youtube', ({ size, color, styleClass }) => <Ionicons name='logo-youtube' size={size} color={color} style={styleClass} solid key='logo-youtube' />],
  ['web', ({ size, color, styleClass }) => <MaterialCommunityIcons name='web' size={size} color={color} style={styleClass} solid key='web' />],
  ['crowdfunding', ({ size, color, styleClass }) => <MaterialIcons name='volunteer-activism' size={size} color={color} style={styleClass} solid key='volunteer-activism' />]
]);

export const iconsMap = {
  get: function(category, props = {}) {
    const finalProps = {
      size: 24,
      color: 'black',
      ...props
    };

    const iconBuilder = values.get(category);
    if (iconBuilder) {
      return iconBuilder(finalProps);
    }
    return undefined;
  }
};
