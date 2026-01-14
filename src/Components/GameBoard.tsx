import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Board } from '../lib/Tic-tac-toe';
import { ThemeColors, GameState, PlayerSymbol } from '../types/game';
import { GameCell } from './GameCell';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GameBoardProps {
  board: Board;
  gameState: GameState;
  colors: ThemeColors;
  isDark: boolean;
  vsCpu: boolean;
  humanPlaysAs: PlayerSymbol;
  onCellPress: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  gameState,
  colors,
  isDark,
  vsCpu,
  humanPlaysAs,
  onCellPress,
}) => {
  const screenDimensions = useMemo(() => {
    const availableWidth = SCREEN_WIDTH - 48;
    const boardSize = Math.min(340, availableWidth);
    const cellSize = Math.floor((boardSize - 24) / 3);
    return { boardSize, cellSize };
  }, []);

  return (
    <View
      style={[
        styles.boardContainer,
        { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
      ]}
    >
      <View
        style={[
          styles.board,
          {
            width: screenDimensions.boardSize,
            height: screenDimensions.boardSize,
          },
        ]}
      >
        {board.map((cell, idx) => {
          const disabled =
            gameState.finished ||
            cell !== null ||
            (vsCpu && gameState.currentPlayer !== humanPlaysAs);
          const isWinning = gameState.winningLine.includes(idx);

          return (
            <GameCell
              key={idx}
              cell={cell}
              index={idx}
              cellSize={screenDimensions.cellSize}
              isWinning={isWinning}
              disabled={disabled}
              isDark={isDark}
              textMutedColor={colors.textMuted}
              onPress={onCellPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    alignSelf: 'center',
    borderRadius: 24,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
});
