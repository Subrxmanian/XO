import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeColors } from '../types/game';

interface TopBarProps {
  colors: ThemeColors;
  onStatsPress: () => void;
  onSettingsPress: () => void;
  onAboutPress: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  colors,
  onStatsPress,
  onSettingsPress,
  onAboutPress,
}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={onStatsPress}
        activeOpacity={0.7}
        style={[styles.iconButton, { backgroundColor: colors.cardBg }]}
      >
        <Icon name="chart-bar" size={22} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.rightButtons}>
        <TouchableOpacity
          onPress={onAboutPress}
          activeOpacity={0.7}
          style={[styles.iconButton, { backgroundColor: colors.cardBg }]}
        >
          <Icon name="information-outline" size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSettingsPress}
          activeOpacity={0.7}
          style={[styles.iconButton, { backgroundColor: colors.cardBg }]}
        >
          <Icon name="cog" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
