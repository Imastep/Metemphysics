import React, { useState } from 'react';
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
import { CalculatorInput } from '../../src/components/CalculatorInput';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

type CalculatorType = 'omega' | 'js' | 'vector' | 'budget';

interface CalculationResult {
  [key: string]: any;
}

export default function CalculatorScreen() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('omega');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Omega inputs
  const [tValue, setTValue] = useState('');
  const [sValue, setSValue] = useState('');
  
  // J/S inputs
  const [jValue, setJValue] = useState('');
  const [sJValue, setSJValue] = useState('');
  
  // Vector inputs
  const [tComponent, setTComponent] = useState('');
  const [sComponent, setSComponent] = useState('');
  const [cComponent, setCComponent] = useState('');
  
  // Budget inputs
  const [totalC, setTotalC] = useState('');
  const [spentC, setSpentC] = useState('');
  
  const calculators: { type: CalculatorType; name: string; icon: string }[] = [
    { type: 'omega', name: 'Ω Omega', icon: 'infinite' },
    { type: 'js', name: 'J/S Ratio', icon: 'analytics' },
    { type: 'vector', name: 'Vector', icon: 'git-branch' },
    { type: 'budget', name: 'C Budget', icon: 'wallet' },
  ];
  
  const calculate = async () => {
    setIsCalculating(true);
    setResult(null);
    
    try {
      let endpoint = '';
      let data = {};
      
      switch (activeCalculator) {
        case 'omega':
          endpoint = '/api/calculate/omega';
          data = { t_value: parseFloat(tValue) || 0, s_value: parseFloat(sValue) || 0 };
          break;
        case 'js':
          endpoint = '/api/calculate/js-ratio';
          data = { j_value: parseFloat(jValue) || 0, s_value: parseFloat(sJValue) || 0 };
          break;
        case 'vector':
          endpoint = '/api/calculate/vector';
          data = {
            t_component: parseFloat(tComponent) || 0,
            s_component: parseFloat(sComponent) || 0,
            c_component: parseFloat(cComponent) || 0,
          };
          break;
        case 'budget':
          endpoint = '/api/calculate/c-budget';
          data = { total_c: parseFloat(totalC) || 0, spent_c: parseFloat(spentC) || 0 };
          break;
      }
      
      const response = await axios.post(`${EXPO_PUBLIC_BACKEND_URL}${endpoint}`, data);
      setResult(response.data);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult({ error: 'Calculation failed. Please check your inputs.' });
    } finally {
      setIsCalculating(false);
    }
  };
  
  const clearInputs = () => {
    setTValue('');
    setSValue('');
    setJValue('');
    setSJValue('');
    setTComponent('');
    setSComponent('');
    setCComponent('');
    setTotalC('');
    setSpentC('');
    setResult(null);
  };
  
  const renderInputs = () => {
    switch (activeCalculator) {
      case 'omega':
        return (
          <>
            <CalculatorInput
              label="Time Component"
              symbol="T"
              value={tValue}
              onChangeText={setTValue}
              placeholder="Enter T value"
            />
            <CalculatorInput
              label="Entropy Component"
              symbol="S"
              value={sValue}
              onChangeText={setSValue}
              placeholder="Enter S value"
            />
          </>
        );
      case 'js':
        return (
          <>
            <CalculatorInput
              label="Negentropy Recovered"
              symbol="J"
              value={jValue}
              onChangeText={setJValue}
              placeholder="Enter J value"
            />
            <CalculatorInput
              label="Entropy Invested"
              symbol="S"
              value={sJValue}
              onChangeText={setSJValue}
              placeholder="Enter S value"
            />
          </>
        );
      case 'vector':
        return (
          <>
            <CalculatorInput
              label="Time Component"
              symbol="T"
              value={tComponent}
              onChangeText={setTComponent}
              placeholder="Enter T"
            />
            <CalculatorInput
              label="Entropy Component"
              symbol="S"
              value={sComponent}
              onChangeText={setSComponent}
              placeholder="Enter S"
            />
            <CalculatorInput
              label="Light Speed Component"
              symbol="C"
              value={cComponent}
              onChangeText={setCComponent}
              placeholder="Enter C"
            />
          </>
        );
      case 'budget':
        return (
          <>
            <CalculatorInput
              label="Total C Available"
              symbol="C₀"
              value={totalC}
              onChangeText={setTotalC}
              placeholder="Total budget"
            />
            <CalculatorInput
              label="C Spent"
              symbol="-C"
              value={spentC}
              onChangeText={setSpentC}
              placeholder="Amount spent"
            />
          </>
        );
    }
  };
  
  const renderResult = () => {
    if (!result) return null;
    
    if (result.error) {
      return (
        <View style={styles.resultCard}>
          <Text style={styles.errorText}>{result.error}</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Result</Text>
        
        {/* Main value */}
        {result.omega !== undefined && (
          <View style={styles.mainResult}>
            <Text style={styles.mainResultLabel}>Ω</Text>
            <Text style={styles.mainResultValue}>{result.omega}</Text>
          </View>
        )}
        {result.js_ratio !== undefined && (
          <View style={styles.mainResult}>
            <Text style={styles.mainResultLabel}>J/S</Text>
            <Text style={styles.mainResultValue}>{result.js_ratio}</Text>
          </View>
        )}
        {result.remaining_c !== undefined && (
          <View style={styles.mainResult}>
            <Text style={styles.mainResultLabel}>Remaining</Text>
            <Text style={styles.mainResultValue}>{result.remaining_c}</Text>
          </View>
        )}
        {result.conservation_score !== undefined && (
          <View style={styles.mainResult}>
            <Text style={styles.mainResultLabel}>Conservation</Text>
            <Text style={styles.mainResultValue}>{(result.conservation_score * 100).toFixed(1)}%</Text>
          </View>
        )}
        
        {/* Phase/State */}
        {(result.phase || result.state) && (
          <View style={styles.phaseContainer}>
            <Text style={styles.phaseLabel}>{result.phase || result.state}</Text>
          </View>
        )}
        
        {/* Interpretation */}
        {result.interpretation && (
          <Text style={styles.interpretation}>{result.interpretation}</Text>
        )}
        
        {/* Description */}
        {result.description && (
          <Text style={styles.description}>{result.description}</Text>
        )}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Metemphysics Calculator</Text>
        <Text style={styles.headerSubtitle}>T × S = C Computations</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calculator Type Selector */}
        <View style={styles.selectorContainer}>
          {calculators.map((calc) => (
            <TouchableOpacity
              key={calc.type}
              style={[
                styles.selectorBtn,
                activeCalculator === calc.type && styles.selectorBtnActive,
              ]}
              onPress={() => {
                setActiveCalculator(calc.type);
                setResult(null);
              }}
            >
              <Ionicons
                name={calc.icon as any}
                size={20}
                color={activeCalculator === calc.type ? COLORS.bg : COLORS.grey}
              />
              <Text
                style={[
                  styles.selectorText,
                  activeCalculator === calc.type && styles.selectorTextActive,
                ]}
              >
                {calc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Calculator Description */}
        <View style={styles.descriptionCard}>
          {activeCalculator === 'omega' && (
            <Text style={styles.calcDescription}>
              Calculate Omega (Ω), the measure of cosmic order ranging from 0 (chaos) to 1 (perfect order).
              Ω = T / (T + S)
            </Text>
          )}
          {activeCalculator === 'js' && (
            <Text style={styles.calcDescription}>
              Calculate J/S ratio - the measure of experiential richness and timeliness.
              Maps to Hawkins consciousness scale.
            </Text>
          )}
          {activeCalculator === 'vector' && (
            <Text style={styles.calcDescription}>
              Analyze a T-S-C vector for conservation compliance and Metemphysical properties.
            </Text>
          )}
          {activeCalculator === 'budget' && (
            <Text style={styles.calcDescription}>
              Track your C budget - the universal conservation currency across time and entropy.
            </Text>
          )}
        </View>
        
        {/* Inputs */}
        <View style={styles.inputsContainer}>
          {renderInputs()}
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.clearBtn} onPress={clearInputs}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.calculateBtn, isCalculating && styles.calculateBtnDisabled]}
            onPress={calculate}
            disabled={isCalculating}
          >
            <Text style={styles.calculateBtnText}>
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Result */}
        {renderResult()}
        
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.bgLighter,
  },
  selectorBtnActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  selectorText: {
    marginLeft: SPACING.xs,
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '500',
  },
  selectorTextActive: {
    color: COLORS.bg,
  },
  descriptionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  calcDescription: {
    fontSize: 14,
    color: COLORS.grey2,
    lineHeight: 20,
  },
  inputsContainer: {
    marginTop: SPACING.lg,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.md,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 16,
    color: COLORS.grey,
    fontWeight: '600',
  },
  calculateBtn: {
    flex: 2,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
  },
  calculateBtnDisabled: {
    opacity: 0.6,
  },
  calculateBtnText: {
    fontSize: 16,
    color: COLORS.bg,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  resultTitle: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  mainResult: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  mainResultLabel: {
    fontSize: 18,
    color: COLORS.gold,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  mainResultValue: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  phaseContainer: {
    backgroundColor: COLORS.bgLighter,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginVertical: SPACING.sm,
  },
  phaseLabel: {
    fontSize: 14,
    color: COLORS.teal,
    fontWeight: '600',
  },
  interpretation: {
    fontSize: 14,
    color: COLORS.grey2,
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: 13,
    color: COLORS.grey,
    fontStyle: 'italic',
    marginTop: SPACING.sm,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
  },
});
