import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  symbol?: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '0',
  symbol,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        {symbol && <Text style={styles.symbol}>{symbol}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        keyboardType="decimal-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginRight: SPACING.xs,
  },
  label: {
    fontSize: 14,
    color: COLORS.grey2,
  },
  input: {
    backgroundColor: COLORS.bgLighter,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 18,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.bgCard,
  },
});
