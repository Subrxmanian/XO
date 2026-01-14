import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GameState } from '../types/game';

interface StatusBadgeProps {
  gameState: GameState;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ gameState }) => {
  const getStatusContent = () => {
    if (gameState.finished) {
      if (gameState.result.winner) {
        return { icon: 'trophy', text: `Winner: ${gameState.result.winner}` };
      }
      return { icon: 'handshake', text: 'Draw!' };
    }
    return { icon: null, text: `Turn: ${gameState.currentPlayer}` };
  };

  const statusContent = getStatusContent();

  const getGradientColors = (): string[] => {
    if (gameState.finished) {
      if (gameState.result.winner) {
        return ['#00d9ff', '#00ff88'];
      }
      return ['#f7971e', '#ffd200'];
    }
    if (gameState.currentPlayer === 'X') {
      return ['#00c6ff', '#0072ff'];
    }
    return ['#f857a6', '#ff5858'];
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.statusBadge}
    >
      <View style={styles.statusContent}>
        {statusContent.icon && (
          <Icon name={statusContent.icon} size={20} color="#ffffff" />
        )}
        <Text style={styles.statusText}>{statusContent.text}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 16,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
