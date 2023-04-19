import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';

const circleSize = 250;
export default function GiftCard({
  name,
  date,
  suffix,
  style,
  textColor = '#000',
  bgColor,
}: {
  name: string;
  date: string;
  suffix: number | string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  bgColor?: string;
}) {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}, style]}>
      <View style={[styles.bgCircle, styles.rightBgCircle]} />
      <View style={[styles.bgCircle, styles.bottomBgCircle]} />
      <View style={styles.cardNumberContainer}>
        <Text style={[styles.text, {color: textColor}]}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // position: "relative"
  },
  logoContainer: {position: 'relative', marginBottom: 24},
  circle: {width: 34, height: 34, borderRadius: 17},
  rightCircle: {backgroundColor: '#f9a000', position: 'absolute', left: 20},
  leftCircle: {backgroundColor: '#ed0006', zIndex: 999},
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardNumberPart: {flexDirection: 'row'},

  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    letterSpacing: 0.53,
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.09,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize,
  },
  rightBgCircle: {
    top: (-1 * circleSize) / 4,
    right: (-1 * circleSize) / 2,
  },
  bottomBgCircle: {
    bottom: (-1 * circleSize) / 2,
    left: (0 * (-1 * circleSize)) / 2,
  },
});
