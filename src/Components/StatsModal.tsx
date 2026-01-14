import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedModal } from './ui/AnimatedModal';
import { ThemeColors, GameStats } from '../types/game';

interface StatsModalProps {
  visible: boolean;
  onClose: () => void;
  colors: ThemeColors;
  stats: GameStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  visible,
  onClose,
  colors,
  stats,
  onResetStats,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const totalGames = stats.X + stats.O + stats.draws;
  const winRateX = totalGames > 0 ? Math.round((stats.X / totalGames) * 100) : 0;
  const winRateO = totalGames > 0 ? Math.round((stats.O / totalGames) * 100) : 0;
  const drawRate =
    totalGames > 0 ? Math.round((stats.draws / totalGames) * 100) : 0;

  return (
    <AnimatedModal
      visible={visible}
      onClose={onClose}
      colors={{
        cardBg: colors.modalBg,
        cardBorder: colors.cardBorder,
        text: colors.text,
      }}
    >
      <View style={styles.modalHeader}>
        <Icon name="chart-bar" size={28} color={colors.text} />
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          Statistics
        </Text>
      </View>
      <View style={styles.statsModalContent}>
        <View
          style={[styles.statsOverview, { backgroundColor: colors.cardBg }]}
        >
          <Text
            style={[styles.statsOverviewLabel, { color: colors.textSecondary }]}
          >
            Total Games Played
          </Text>
          <Text style={[styles.statsOverviewValue, { color: colors.text }]}>
            {totalGames}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#00c6ff', '#0072ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Icon name="alpha-x-box" size={32} color="#ffffff" />
            <Text style={styles.statValue}>{stats.X}</Text>
            <Text style={styles.statLabel}>X Wins</Text>
            <Text style={styles.statPercent}>{winRateX}%</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#f7971e', '#ffd200']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Icon name="handshake" size={32} color="#ffffff" />
            <Text style={styles.statValue}>{stats.draws}</Text>
            <Text style={styles.statLabel}>Draws</Text>
            <Text style={styles.statPercent}>{drawRate}%</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#f857a6', '#ff5858']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <Icon name="alpha-o-box" size={32} color="#ffffff" />
            <Text style={styles.statValue}>{stats.O}</Text>
            <Text style={styles.statLabel}>O Wins</Text>
            <Text style={styles.statPercent}>{winRateO}%</Text>
          </LinearGradient>
        </View>
        {!showConfirm ? (
          <TouchableOpacity
            onPress={() => setShowConfirm(true)}
            activeOpacity={0.8}
            style={styles.resetButton}
          >
            <LinearGradient
              colors={['#f857a6', '#ff5858']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.resetButtonGradient}
            >
              <View style={styles.buttonContent}>
                <Icon name="trash-can-outline" size={18} color="#ffffff" />
                <Text style={styles.buttonText}>Reset Statistics</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={[styles.confirmContainer, { backgroundColor: colors.cardBg }]}>
            <View style={styles.confirmHeader}>
              <Icon name="alert-circle-outline" size={24} color="#ff5858" />
              <Text style={[styles.confirmTitle, { color: colors.text }]}>
                Reset Statistics?
              </Text>
            </View>
            <Text style={[styles.confirmMessage, { color: colors.textSecondary }]}>
              Are you sure you want to reset all game statistics? This action cannot be undone.
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                onPress={() => setShowConfirm(false)}
                activeOpacity={0.8}
                style={[styles.confirmButton, styles.cancelButton, { borderColor: colors.cardBorder }]}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onResetStats();
                  setShowConfirm(false);
                }}
                activeOpacity={0.8}
                style={styles.confirmButton}
              >
                <LinearGradient
                  colors={['#f857a6', '#ff5858']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmButtonGradient}
                >
                  <Text style={styles.confirmButtonText}>Reset</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </AnimatedModal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  statsModalContent: {
    paddingBottom: 20,
  },
  statsOverview: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statsOverviewLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  statsOverviewValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  statPercent: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  resetButton: {
    marginTop: 8,
  },
  resetButtonGradient: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  confirmContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  confirmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  confirmMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cancelButton: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
