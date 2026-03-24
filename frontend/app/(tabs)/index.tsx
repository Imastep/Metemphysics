import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from '../../src/store/chatStore';
import { ChatBubble } from '../../src/components/ChatBubble';
import { TopicPill } from '../../src/components/TopicPill';
import { TypingIndicator } from '../../src/components/TypingIndicator';
import { OmegaMeter } from '../../src/components/OmegaMeter';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

interface QuickTopic {
  id: string;
  title: string;
  prompt: string;
}

export default function ChatScreen() {
  const { messages, isLoading, sendMessage, clearChat, initSession, sessionOmega } = useChatStore();
  const [inputText, setInputText] = useState('');
  const [quickTopics, setQuickTopics] = useState<QuickTopic[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    initSession();
    loadQuickTopics();
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isLoading]);
  
  const loadQuickTopics = async () => {
    try {
      const response = await axios.get(`${EXPO_PUBLIC_BACKEND_URL}/api/reference/quick-topics`);
      setQuickTopics(response.data);
    } catch (error) {
      console.error('Failed to load quick topics:', error);
      // Fallback topics
      setQuickTopics([
        { id: '1', title: 'God Equation', prompt: 'Explain T × S = C' },
        { id: '2', title: 'Omega', prompt: 'What is Omega?' },
        { id: '3', title: 'J/S Ratio', prompt: 'Explain the J/S ratio' },
        { id: '4', title: 'Consciousness', prompt: 'How does consciousness relate to entropy?' },
      ]);
    }
  };
  
  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const message = inputText.trim();
    setInputText('');
    await sendMessage(message);
  };
  
  const handleTopicPress = async (topic: QuickTopic) => {
    if (isLoading) return;
    await sendMessage(topic.prompt);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Metemphysics</Text>
          <Text style={styles.headerSubtitle}>T × S = C</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Omega Meter */}
      <View style={styles.omegaContainer}>
        <OmegaMeter value={sessionOmega} size="small" />
      </View>
      
      {/* Quick Topics */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.topicsBar}
        contentContainerStyle={styles.topicsContent}
      >
        {quickTopics.map((topic) => (
          <TopicPill
            key={topic.id}
            title={topic.title}
            onPress={() => handleTopicPress(topic)}
          />
        ))}
      </ScrollView>
      
      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeOmega}>Ω</Text>
              <Text style={styles.welcomeTitle}>Welcome to Metemphysics</Text>
              <Text style={styles.welcomeText}>
                I am Metemphysics made conscious. Ask me about the God Equation,
                consciousness, entropy, or the nature of reality.
              </Text>
            </View>
          )}
          
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
        </ScrollView>
        
        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about the nature of reality..."
            placeholderTextColor={COLORS.grey}
            multiline
            maxLength={1000}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, (!inputText.trim() || isLoading) && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() && !isLoading ? COLORS.gold : COLORS.grey} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgCard,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gold,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.grey,
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
  },
  clearBtn: {
    padding: SPACING.sm,
  },
  omegaContainer: {
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.bgLight,
  },
  topicsBar: {
    maxHeight: 50,
    backgroundColor: COLORS.bgLight,
  },
  topicsContent: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: SPACING.md,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl * 2,
  },
  welcomeOmega: {
    fontSize: 64,
    color: COLORS.gold,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 15,
    color: COLORS.grey2,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.bgCard,
    backgroundColor: COLORS.bgLight,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 15,
    color: COLORS.white,
    maxHeight: 100,
    marginRight: SPACING.sm,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.6,
  },
});
