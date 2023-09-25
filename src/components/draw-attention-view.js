import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

// Vista que anima su contenido para llamar la atención.
export default function DrawAttentionView(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const duration = props.duration || 666;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.0,
          duration,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [fadeAnim]);

  // Alternativa, pero no llama mucho la atención
  // const spinZ = fadeAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['-15deg', '15deg']
  // });

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim
        /* transform: [{rotateZ: spinZ}] */
      }}
    >
      {props.children}
    </Animated.View>
  );
}
