import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeColors, GameStats } from '../types/game';

interface QuickStatsCardProps {
  colors: ThemeColors;
  stats: GameStats;
  onPress: () => void;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  colors,
  stats,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.quickStatsCard,
        { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
      ]}
    >
      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatItem}>
          <Text style={[styles.quickStatValue, { color: '#00c6ff' }]}>
            {stats.X}
          </Text>
          <Text style={[styles.quickStatLabel, { color: colors.textMuted }]}>
            X Wins
          </Text>
        </View>
        <View style={styles.quickStatDivider} />
        <View style={styles.quickStatItem}>
          <Text style={[styles.quickStatValue, { color: '#ffd200' }]}>
            {stats.draws}
          </Text>
          <Text style={[styles.quickStatLabel, { color: colors.textMuted }]}>
            Draws
          </Text>
        </View>
        <View style={styles.quickStatDivider} />
        <View style={styles.quickStatItem}>
          <Text style={[styles.quickStatValue, { color: '#f857a6' }]}>
            {stats.O}
          </Text>
          <Text style={[styles.quickStatLabel, { color: colors.textMuted }]}>
            O Wins
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickStatsCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  quickStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  quickStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  quickStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
