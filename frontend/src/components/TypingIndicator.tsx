import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export const TypingIndicator: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    
    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);
  
  const dotStyle = (animValue: Animated.Value) => ({
    transform: [{
      translateY: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -6],
      }),
    }],
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Animated.Text style={[styles.avatarText]}>Ω</Animated.Text>
      </View>
      <View style={styles.bubble}>
        <Animated.View style={[styles.dot, dotStyle(dot1)]} />
        <Animated.View style={[styles.dot, dotStyle(dot2)]} />
        <Animated.View style={[styles.dot, dotStyle(dot3)]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.bg,
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderTopLeftRadius: RADIUS.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
    marginHorizontal: 3,
  },
});
