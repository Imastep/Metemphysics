import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  omega?: number;
  js_ratio?: number;
}

interface ChatState {
  messages: Message[];
  sessionId: string;
  isLoading: boolean;
  error: string | null;
  sessionOmega: number;
  
  sendMessage: (text: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearChat: () => Promise<void>;
  initSession: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sessionId: '',
  isLoading: false,
  error: null,
  sessionOmega: 0.5,
  
  initSession: async () => {
    try {
      let sessionId = await AsyncStorage.getItem('metemphysics_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await AsyncStorage.setItem('metemphysics_session_id', sessionId);
      }
      set({ sessionId });
      await get().loadHistory();
    } catch (error) {
      console.error('Init session error:', error);
      const sessionId = `session_${Date.now()}`;
      set({ sessionId });
    }
  },
  
  sendMessage: async (text: string) => {
    const { sessionId, messages } = get();
    
    // Add user message immediately
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    set({ 
      messages: [...messages, userMessage], 
      isLoading: true, 
      error: null 
    });
    
    try {
      const response = await axios.post(`${EXPO_PUBLIC_BACKEND_URL}/api/chat`, {
        session_id: sessionId,
        message: text,
      });
      
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        content: response.data.response,
        timestamp: new Date(),
        omega: response.data.omega,
        js_ratio: response.data.js_ratio,
      };
      
      // Calculate session omega as average
      const allMessages = [...get().messages, aiMessage];
      const aiMessages = allMessages.filter(m => m.role === 'ai' && m.omega);
      const avgOmega = aiMessages.length > 0 
        ? aiMessages.reduce((sum, m) => sum + (m.omega || 0), 0) / aiMessages.length
        : 0.5;
      
      set({ 
        messages: [...get().messages, aiMessage], 
        isLoading: false,
        sessionOmega: avgOmega,
      });
      
    } catch (error: any) {
      console.error('Send message error:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.detail || 'Failed to send message' 
      });
    }
  },
  
  loadHistory: async () => {
    const { sessionId } = get();
    if (!sessionId) return;
    
    try {
      const response = await axios.get(
        `${EXPO_PUBLIC_BACKEND_URL}/api/chat/history/${sessionId}`
      );
      
      const messages: Message[] = response.data.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        omega: msg.omega,
        js_ratio: msg.js_ratio,
      }));
      
      set({ messages });
    } catch (error) {
      console.error('Load history error:', error);
    }
  },
  
  clearChat: async () => {
    const { sessionId } = get();
    
    try {
      await axios.delete(`${EXPO_PUBLIC_BACKEND_URL}/api/chat/history/${sessionId}`);
      
      // Generate new session
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem('metemphysics_session_id', newSessionId);
      
      set({ 
        messages: [], 
        sessionId: newSessionId,
        sessionOmega: 0.5,
      });
    } catch (error) {
      console.error('Clear chat error:', error);
    }
  },
}));
