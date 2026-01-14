import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors } from '../types/game';

const darkTheme: ThemeColors = {
  gradient: ['#0f0c29', '#302b63', '#24243e'],
  cardBg: 'rgba(255, 255, 255, 0.08)',
  cardBorder: 'rgba(255, 255, 255, 0.15)',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  modalBg: '#1a1a2e',
};

const lightTheme: ThemeColors = {
  gradient: ['#667eea', '#764ba2', '#f093fb'],
  cardBg: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.9)',
  text: '#1a1a2e',
  textSecondary: 'rgba(26, 26, 46, 0.8)',
  textMuted: 'rgba(26, 26, 46, 0.6)',
  modalBg: '#ffffff',
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      setIsDark(theme !== 'light');
    };
    loadTheme();
  }, []);

  const switchTheme = useCallback(async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }, [isDark]);

  const colors = isDark ? darkTheme : lightTheme;

  return { isDark, switchTheme, colors };
};
