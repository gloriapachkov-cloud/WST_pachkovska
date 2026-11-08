import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
export default function Header() {
  return <View>
    <Text style={styles.eyebrow}>BEAUTY STUDIO · APPOINTMENTS</Text>
    <Text style={styles.brand}>RE:BELLE</Text>
    <Text style={styles.tagline}>your beauty, your moment</Text>
  </View>;
}
