import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface TopicPillProps {
  title: string;
  onPress: () => void;
  isActive?: boolean;
}

export const TopicPill: React.FC<TopicPillProps> = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity 
      style={[styles.pill, isActive && styles.pillActive]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.bgLighter,
    marginRight: SPACING.sm,
  },
  pillActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  pillText: {
    color: COLORS.grey2,
    fontSize: 13,
    fontWeight: '500',
  },
  pillTextActive: {
    color: COLORS.bg,
  },
});
