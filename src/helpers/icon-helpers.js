import React from 'react';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const values = new Map([
  ['0', ({size, color, styleClass}) => <FontAwesome5 name="theater-masks" size={size} color={color} style={styleClass} />],
  ['1', ({size, color, styleClass}) => <MaterialCommunityIcons name="spray" size={size} color={color} style={styleClass} /> ],
  ['2', ({size, color, styleClass}) => <AntDesign name="videocamera" size={size} color={color} style={styleClass} /> ],
  ['3', ({size, color, styleClass}) => <AntDesign name="picture" size={size} color={color} style={styleClass} /> ],
  ['4', ({size, color, styleClass}) => <Feather name="music" size={size} color={color} style={styleClass} /> ],
  ['5', ({size, color, styleClass}) => <FontAwesome5 name="lightbulb" size={size} color={color} style={styleClass} /> ],
  ['6', ({size, color, styleClass}) => <FontAwesome5 name="feather-alt" size={size} color={color} style={styleClass} /> ],
  ['7', ({size, color, styleClass}) => <Ionicons name="ios-people" size={size} color={color} style={styleClass} /> ],
  ['8', ({size, color, styleClass}) => <FontAwesome5 name="building" size={size} color={color} style={styleClass} />],
	  //   ["0", "Artes Escénicas" ],
	  //   ["1", "Arte Urbano" ],
	  //   ["2", "Audiovisual" ],
	  //   ["3", "Exposición" ],
	  //   ["4", "Música" ],
	  //   ["5", "Otros" ],
	  //   ["6", "Poesía" ],
	  //   ["7", "Talleres / Charlas" ],
	  //   ["8", "Instalaciones Urbanas"],
    ]);

export const iconsMap = {
  get: function(category, props = {}) {
    const finalProps = {
      size: 24,
      color: 'black',
      ...props
    };
    
    let iconBuilder = values.get(category);
    if (iconBuilder) {
      return iconBuilder(finalProps);
    }
    return undefined;
  }
};
