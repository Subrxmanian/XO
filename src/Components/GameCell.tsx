import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Cell } from '../lib/Tic-tac-toe';

interface GameCellProps {
  cell: Cell;
  index: number;
  cellSize: number;
  isWinning: boolean;
  disabled: boolean;
  isDark: boolean;
  textMutedColor: string;
  onPress: (index: number) => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  cell,
  index,
  cellSize,
  isWinning,
  disabled,
  isDark,
  textMutedColor,
  onPress,
}) => {
  const getCellGradient = (): string[] => {
    if (cell === 'X') {
      return isWinning
        ? ['#00d9ff', '#00ff88', '#00d9ff']
        : ['#00c6ff', '#0072ff'];
    }
    if (cell === 'O') {
      return isWinning
        ? ['#ff00cc', '#ffff00', '#ff00cc']
        : ['#f857a6', '#ff5858'];
    }
    return isDark
      ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']
      : ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.8)'];
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}
    >
      <LinearGradient
        colors={getCellGradient()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.cell,
          isWinning && styles.winningCell,
          !cell && styles.emptyCell,
        ]}
      >
        <Text
          style={[
            styles.cellText,
            cell && styles.cellTextFilled,
            !cell && { color: textMutedColor },
          ]}
        >
          {cell || ''}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cellWrapper: {
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCell: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  winningCell: {
    shadowColor: '#00ff88',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  cellText: {
    fontSize: 40,
    fontWeight: '800',
  },
  cellTextFilled: {
    color: '#ffffff',
  },
});
