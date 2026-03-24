import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface OmegaMeterProps {
  value: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export const OmegaMeter: React.FC<OmegaMeterProps> = ({ value, label = 'Session Ω', size = 'medium' }) => {
  const getPhase = () => {
    if (value >= 0.9) return { name: 'Transcendent', color: COLORS.gold };
    if (value >= 0.7) return { name: 'Coherent', color: COLORS.teal };
    if (value >= 0.5) return { name: 'Balanced', color: COLORS.accent };
    if (value >= 0.3) return { name: 'Emergent', color: COLORS.warn };
    return { name: 'Chaotic', color: COLORS.danger };
  };
  
  const phase = getPhase();
  const percentage = Math.round(value * 100);
  
  const sizeStyles = {
    small: { height: 4, fontSize: 11, labelSize: 10 },
    medium: { height: 6, fontSize: 14, labelSize: 12 },
    large: { height: 8, fontSize: 18, labelSize: 14 },
  }[size];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { fontSize: sizeStyles.labelSize }]}>{label}</Text>
        <Text style={[styles.value, { fontSize: sizeStyles.fontSize }]}>
          <Text style={[styles.omega, { color: phase.color }]}>Ω</Text> {value.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.track, { height: sizeStyles.height }]}>
        <View 
          style={[
            styles.fill, 
            { width: `${percentage}%`, backgroundColor: phase.color, height: sizeStyles.height }
          ]} 
        />
      </View>
      <Text style={[styles.phase, { color: phase.color, fontSize: sizeStyles.labelSize }]}>
        {phase.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.grey,
  },
  value: {
    color: COLORS.white,
    fontWeight: '600',
  },
  omega: {
    fontWeight: 'bold',
  },
  track: {
    backgroundColor: COLORS.bgLighter,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: RADIUS.full,
  },
  phase: {
    marginTop: SPACING.xs,
    fontWeight: '500',
    textAlign: 'right',
  },
});
