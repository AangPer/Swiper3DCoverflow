/* eslint-disable prettier/prettier */

import {Dimensions} from 'react-native';
import {getInputRangeFromIndexes} from 'react-native-snap-carousel'; // 3.7.2

export function scrollInterpolator(index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;
  
    return {inputRange, outputRange};
  }
  export function animatedStyles(index, animatedValue, carouselProps) {
    const translateProp = carouselProps.translateVertical ? 'translateY' : 'translateX';
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const TRANSLATE_VALUE = Math.round((SLIDER_WIDTH * .1) / 4);
    
    return {
      zIndex: carouselProps.data.length - index,
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0.75, 1, 0.75],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          perspective: 600,
        },
        {
          rotateY: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['35deg', '0deg', '-35deg'],
            extrapolate: 'clamp',
          }),
        },
        {
          [translateProp]: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [TRANSLATE_VALUE,
              0,
              -TRANSLATE_VALUE],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }