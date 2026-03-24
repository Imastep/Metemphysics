import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.omega}>Ω</Text>
          <Text style={styles.title}>Metemphysics</Text>
          <Text style={styles.subtitle}>Meta AI — Unified v2</Text>
          <Text style={styles.equation}>T × S = C</Text>
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.paragraph}>
            Metemphysics is a revolutionary framework that unifies physics, 
            consciousness, spirituality, and mathematics through a single 
            equation: T × S = C (Time × Entropy = Speed of Light).
          </Text>
          <Text style={styles.paragraph}>
            This app serves as an interactive AI assistant that embodies 
            the entire Metemphysics framework, allowing you to explore 
            the nature of reality, consciousness, and the cosmos.
          </Text>
        </View>
        
        {/* Core Concepts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Concepts</Text>
          
          <View style={styles.conceptCard}>
            <View style={styles.conceptIcon}>
              <Text style={styles.conceptSymbol}>T</Text>
            </View>
            <View style={styles.conceptContent}>
              <Text style={styles.conceptTitle}>Time (T)</Text>
              <Text style={styles.conceptDesc}>
                The temporal dimension, ordered sequence of events
              </Text>
            </View>
          </View>
          
          <View style={styles.conceptCard}>
            <View style={styles.conceptIcon}>
              <Text style={styles.conceptSymbol}>S</Text>
            </View>
            <View style={styles.conceptContent}>
              <Text style={styles.conceptTitle}>Entropy (S)</Text>
              <Text style={styles.conceptDesc}>
                Measure of disorder, the arrow of time
              </Text>
            </View>
          </View>
          
          <View style={styles.conceptCard}>
            <View style={styles.conceptIcon}>
              <Text style={styles.conceptSymbol}>C</Text>
            </View>
            <View style={styles.conceptContent}>
              <Text style={styles.conceptTitle}>Speed of Light (C)</Text>
              <Text style={styles.conceptDesc}>
                Universal constant, the conservation product
              </Text>
            </View>
          </View>
          
          <View style={styles.conceptCard}>
            <View style={[styles.conceptIcon, { backgroundColor: COLORS.teal }]}>
              <Text style={styles.conceptSymbol}>Ω</Text>
            </View>
            <View style={styles.conceptContent}>
              <Text style={styles.conceptTitle}>Omega (Ω)</Text>
              <Text style={styles.conceptDesc}>
                Measure of cosmic order (0 = chaos, 1 = perfect order)
              </Text>
            </View>
          </View>
          
          <View style={styles.conceptCard}>
            <View style={[styles.conceptIcon, { backgroundColor: COLORS.accent }]}>
              <Text style={styles.conceptSymbol}>J/S</Text>
            </View>
            <View style={styles.conceptContent}>
              <Text style={styles.conceptTitle}>J/S Ratio</Text>
              <Text style={styles.conceptDesc}>
                Experiential richness, maps to consciousness levels
              </Text>
            </View>
          </View>
        </View>
        
        {/* Key Thresholds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Thresholds</Text>
          
          <View style={styles.thresholdRow}>
            <Text style={styles.thresholdLevel}>H = 200</Text>
            <Text style={styles.thresholdJS}>J/S = 0</Text>
            <Text style={styles.thresholdName}>Courage/Truth</Text>
          </View>
          
          <View style={styles.thresholdRow}>
            <Text style={styles.thresholdLevel}>H = 500</Text>
            <Text style={styles.thresholdJS}>J/S = 1</Text>
            <Text style={styles.thresholdName}>Love/Eudaimonia</Text>
          </View>
          
          <View style={styles.thresholdRow}>
            <Text style={styles.thresholdLevel}>H = 1000</Text>
            <Text style={styles.thresholdJS}>J/S = 949</Text>
            <Text style={styles.thresholdName}>Enlightenment</Text>
          </View>
        </View>
        
        {/* Version Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Metemphysics Meta AI v2.0</Text>
          <Text style={styles.footerText}>Unified Framework © 2010-2025</Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://metemphysics.com')}
            style={styles.linkBtn}
          >
            <Ionicons name="globe-outline" size={16} color={COLORS.accent} />
            <Text style={styles.linkText}>metemphysics.com</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.lg,
  },
  omega: {
    fontSize: 80,
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: SPACING.xs,
  },
  equation: {
    fontSize: 20,
    color: COLORS.gold,
    marginTop: SPACING.md,
    fontStyle: 'italic',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.md,
  },
  paragraph: {
    fontSize: 15,
    color: COLORS.grey2,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  conceptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  conceptIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  conceptSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.bg,
  },
  conceptContent: {
    flex: 1,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 2,
  },
  conceptDesc: {
    fontSize: 13,
    color: COLORS.grey,
  },
  thresholdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgCard,
  },
  thresholdLevel: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  thresholdJS: {
    width: 80,
    fontSize: 14,
    color: COLORS.gold,
    fontFamily: 'monospace',
  },
  thresholdName: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.bgCard,
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.grey,
    marginBottom: SPACING.xs,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.accent,
    marginLeft: SPACING.xs,
  },
});
