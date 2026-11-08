import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { styles } from './styles';

export const Chip = ({ text, selected, onPress }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.chip, selected && styles.chipActive]}>
    <Text style={[styles.chipText, selected && styles.chipTextActive]}>{text}</Text>
  </TouchableOpacity>
);
export const Button = ({ title, onPress, secondary }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}>
    <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{title}</Text>
  </TouchableOpacity>
);
export const Field = ({ label, value, onChangeText, placeholder, keyboardType = 'default', maxLength }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder}
      placeholderTextColor="#BCA9B1" keyboardType={keyboardType} maxLength={maxLength} />
  </View>
);
export const Card = ({ children }) => <View style={styles.card}>{children}</View>;
