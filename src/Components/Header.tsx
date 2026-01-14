import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeColors } from '../types/game';

interface HeaderProps {
  colors: ThemeColors;
}

export const Header: React.FC<HeaderProps> = ({ colors }) => {
  return (
    <View style={styles.header}>
      {/* <Image
        source={require('../../assets/image/removed-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <Text style={[styles.title, { color: colors.text }]}>Tic Tac Toe</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Classic Game, Modern Style
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
