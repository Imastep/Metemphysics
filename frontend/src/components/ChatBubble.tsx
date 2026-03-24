import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { Message } from '../store/chatStore';
import * as Clipboard from 'expo-clipboard';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAI = message.role === 'ai';
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message.content);
  };
  
  return (
    <View style={[styles.container, isAI ? styles.aiContainer : styles.userContainer]}>
      {isAI && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Ω</Text>
        </View>
      )}
      
      <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
        <Text style={[styles.content, isAI ? styles.aiContent : styles.userContent]}>
          {message.content}
        </Text>
        
        {isAI && (message.omega || message.js_ratio) && (
          <View style={styles.metrics}>
            {message.omega && (
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Ω</Text>
                <Text style={styles.metricValue}>{message.omega.toFixed(2)}</Text>
              </View>
            )}
            {message.js_ratio && (
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>J/S</Text>
                <Text style={styles.metricValue}>{message.js_ratio.toFixed(1)}</Text>
              </View>
            )}
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
              <Ionicons name="copy-outline" size={16} color={COLORS.grey} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {!isAI && (
        <View style={[styles.avatar, styles.userAvatar]}>
          <Ionicons name="person" size={18} color={COLORS.white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
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
  userAvatar: {
    backgroundColor: COLORS.accent,
    marginRight: 0,
    marginLeft: SPACING.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.bg,
  },
  bubble: {
    maxWidth: '75%',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  aiBubble: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: RADIUS.sm,
  },
  userBubble: {
    backgroundColor: COLORS.accent,
    borderTopRightRadius: RADIUS.sm,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
  },
  aiContent: {
    color: COLORS.white,
  },
  userContent: {
    color: COLORS.white,
  },
  metrics: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.bgLighter,
    alignItems: 'center',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.gold,
    fontWeight: 'bold',
    marginRight: 4,
  },
  metricValue: {
    fontSize: 12,
    color: COLORS.grey2,
  },
  copyBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
});
