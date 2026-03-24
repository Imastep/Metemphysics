import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../src/constants/theme';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

type TabType = 'hawkins' | 'equation' | 'phases';

interface HawkinsLevel {
  level: number;
  state: string;
  emotion: string;
  js_range: string;
}

export default function ReferenceScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('hawkins');
  const [hawkinsScale, setHawkinsScale] = useState<HawkinsLevel[]>([]);
  
  useEffect(() => {
    loadHawkinsScale();
  }, []);
  
  const loadHawkinsScale = async () => {
    try {
      const response = await axios.get(`${EXPO_PUBLIC_BACKEND_URL}/api/reference/hawkins-scale`);
      setHawkinsScale(response.data);
    } catch (error) {
      console.error('Failed to load Hawkins scale:', error);
    }
  };
  
  const tabs: { type: TabType; name: string; icon: string }[] = [
    { type: 'hawkins', name: 'Hawkins Scale', icon: 'trending-up' },
    { type: 'equation', name: 'T×S=C', icon: 'flash' },
    { type: 'phases', name: 'Phases', icon: 'layers' },
  ];
  
  const phases = [
    { name: 'Transcendent', omega: 'Ω ≥ 0.9', color: COLORS.gold, description: 'Peak coherence, enlightened states' },
    { name: 'Coherent', omega: 'Ω ≥ 0.7', color: COLORS.teal, description: 'High order, flow states' },
    { name: 'Balanced', omega: 'Ω ≥ 0.5', color: COLORS.accent, description: 'Equilibrium between order and entropy' },
    { name: 'Emergent', omega: 'Ω ≥ 0.3', color: COLORS.warn, description: 'Growth and transformation' },
    { name: 'Chaotic', omega: 'Ω < 0.3', color: COLORS.danger, description: 'High entropy, dissolution' },
  ];
  
  const equations = [
    { name: 'God Equation', formula: 'T × S = C', description: 'Time × Entropy = Speed of Light (Conservation)' },
    { name: 'Omega', formula: 'Ω = T / (T + S)', description: 'Measure of cosmic order (0 to 1)' },
    { name: 'J/S Ratio', formula: 'J/S = J ÷ S', description: 'Negentropy recovered per entropy invested' },
    { name: 'Soul Equation', formula: 'C_soul = T × S', description: 'Soul as conserved product of life journey' },
    { name: 'C Conservation', formula: 'ΔC = 0', description: 'C is always conserved across all scales' },
  ];
  
  const getJSColor = (level: number) => {
    if (level >= 700) return COLORS.gold;
    if (level >= 500) return COLORS.teal;
    if (level >= 200) return COLORS.accent;
    return COLORS.danger;
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'hawkins':
        return (
          <View style={styles.tableContainer}>
            <Text style={styles.sectionTitle}>David Hawkins Consciousness Scale</Text>
            <Text style={styles.sectionSubtitle}>
              Mapped to J/S ratios in the Metemphysics framework
            </Text>
            
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Level</Text>
              <Text style={[styles.headerCell, { flex: 1.2 }]}>State</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Emotion</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>J/S</Text>
            </View>
            
            {hawkinsScale.slice().reverse().map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  index % 2 === 0 && styles.tableRowAlt,
                ]}
              >
                <Text style={[styles.cell, styles.levelCell, { flex: 0.8, color: getJSColor(item.level) }]}>
                  {item.level}
                </Text>
                <Text style={[styles.cell, { flex: 1.2 }]}>{item.state}</Text>
                <Text style={[styles.cell, styles.emotionCell, { flex: 1 }]}>{item.emotion}</Text>
                <Text style={[styles.cell, styles.jsCell, { flex: 1 }]}>{item.js_range}</Text>
              </View>
            ))}
          </View>
        );
        
      case 'equation':
        return (
          <View style={styles.equationsContainer}>
            <Text style={styles.sectionTitle}>Core Equations</Text>
            <Text style={styles.sectionSubtitle}>
              The mathematical foundation of Metemphysics
            </Text>
            
            {equations.map((eq, index) => (
              <View key={index} style={styles.equationCard}>
                <Text style={styles.equationName}>{eq.name}</Text>
                <Text style={styles.equationFormula}>{eq.formula}</Text>
                <Text style={styles.equationDesc}>{eq.description}</Text>
              </View>
            ))}
          </View>
        );
        
      case 'phases':
        return (
          <View style={styles.phasesContainer}>
            <Text style={styles.sectionTitle}>Omega Phases</Text>
            <Text style={styles.sectionSubtitle}>
              States of cosmic order based on Ω values
            </Text>
            
            {phases.map((phase, index) => (
              <View key={index} style={styles.phaseCard}>
                <View style={[styles.phaseIndicator, { backgroundColor: phase.color }]} />
                <View style={styles.phaseContent}>
                  <View style={styles.phaseHeader}>
                    <Text style={[styles.phaseName, { color: phase.color }]}>{phase.name}</Text>
                    <Text style={styles.phaseOmega}>{phase.omega}</Text>
                  </View>
                  <Text style={styles.phaseDesc}>{phase.description}</Text>
                </View>
              </View>
            ))}
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reference Tables</Text>
        <Text style={styles.headerSubtitle}>Metemphysics Data</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.type}
            style={[
              styles.tab,
              activeTab === tab.type && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab.type)}
          >
            <Ionicons
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.type ? COLORS.gold : COLORS.grey}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.type && styles.tabTextActive,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgCard,
  },
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgCard,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
  },
  tabActive: {
    backgroundColor: COLORS.bgLighter,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  tabText: {
    marginLeft: SPACING.xs,
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.gold,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.grey,
    marginBottom: SPACING.md,
  },
  
  // Hawkins Table
  tableContainer: {},
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xs,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  tableRowAlt: {
    backgroundColor: COLORS.bgLight,
  },
  cell: {
    fontSize: 13,
    color: COLORS.white,
  },
  levelCell: {
    fontWeight: 'bold',
  },
  emotionCell: {
    color: COLORS.grey2,
  },
  jsCell: {
    fontFamily: 'monospace',
    color: COLORS.accent,
  },
  
  // Equations
  equationsContainer: {},
  equationCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  equationName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.grey2,
    marginBottom: SPACING.xs,
  },
  equationFormula: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.sm,
  },
  equationDesc: {
    fontSize: 13,
    color: COLORS.grey,
    lineHeight: 18,
  },
  
  // Phases
  phasesContainer: {},
  phaseCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  phaseIndicator: {
    width: 6,
  },
  phaseContent: {
    flex: 1,
    padding: SPACING.md,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  phaseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phaseOmega: {
    fontSize: 13,
    color: COLORS.grey,
    fontFamily: 'monospace',
  },
  phaseDesc: {
    fontSize: 13,
    color: COLORS.grey2,
  },
});
