import React from 'react';
import { Text } from 'react-native';

const Program = ({ shows }) => (
  <ul>
    {shows.map((show, index) => (
      <li key={index}> 
        <Text>
          {show.title} | {show.participant_category}
        </Text>
      </li>
    ))}
  </ul>
)

export default Program;