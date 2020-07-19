import React from 'react';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export const iconsMap = new Map([
  ['0', <FontAwesome5 name="theater-masks" size={24} color="black" />],
  ['1', <MaterialCommunityIcons name="spray" size={24} color="black" /> ],
  ['2', <AntDesign name="videocamera" size={24} color="black" /> ],
  ['3', <AntDesign name="picture" size={24} color="black" /> ],
  ['4', <Feather name="music" size={24} color="black" /> ],
  ['5', <FontAwesome5 name="lightbulb" size={24} color="black" /> ],
  ['6', <FontAwesome5 name="feather-alt" size={24} color="black" /> ],
  ['7', <Ionicons name="ios-people" size={24} color="black" /> ],
	['8', <FontAwesome5 name="building" size={24} color="black" />],
	//   ["0", "Artes Escénicas" ],
	//   ["1", "Arte Urbano" ],
	//   ["2", "Audiovisual" ],
	//   ["3", "Exposición" ],
	//   ["4", "Música" ],
	//   ["5", "Otros" ],
	//   ["6", "Poesía" ],
	//   ["7", "Talleres / Charlas" ],
	//   ["8", "Instalaciones Urbanas"],
])
