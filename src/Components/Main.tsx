import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  Pressable,
  Dimensions,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useColorScheme } from 'nativewind';
import {
  bestMove,
  getWinner,
  isDraw as computeIsDraw,
  type Board,
  type Cell,
} from '../lib/Tic-tac-toe';
import { useAsyncStorageState } from '../hooks/use-asynsc';
import { Sun, SunMoon } from 'lucide-react-native';

type Difficulty = 'easy' | 'unbeatable';

export default function Main() {
  const { colorScheme, setColorScheme } = useColorScheme();

  // Single source of truth for gameplay
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  // Persisted preferences and stats
  const [vsCpu, setVsCpu] = useAsyncStorageState<boolean>('ttt:vsCpu', true);
  const [difficulty, setDifficulty] = useAsyncStorageState<Difficulty>(
    'ttt:difficulty',
    'unbeatable',
  );
  const [humanPlaysAs, setHumanPlaysAs] = useAsyncStorageState<
    Exclude<Cell, null>
  >('ttt:human', 'X');
  const [stats, setStats] = useAsyncStorageState<{
    X: number;
    O: number;
    draws: number;
  }>('ttt:stats', {
    X: 0,
    O: 0,
    draws: 0,
  });

  // Memoized board calculations for better performance
  const gameState = useMemo(() => {
    const xCount = board.filter(c => c === 'X').length;
    const oCount = board.filter(c => c === 'O').length;
    const xIsNext = xCount === oCount;
    const currentPlayer: Exclude<Cell, null> = xIsNext ? 'X' : 'O';
    const result = getWinner(board);
    const isDraw = computeIsDraw(board);
    const finished = !!result.winner || isDraw;

    return {
      xCount,
      oCount,
      xIsNext,
      currentPlayer,
      result,
      isDraw,
      finished,
      winningLine: result.line ?? [],
    };
  }, [board]);

  const aiSymbol: Exclude<Cell, null> = humanPlaysAs === 'X' ? 'O' : 'X';
  const finishedOnce = useRef(false);
  const [confetti, setConfetti] = useState(false);

  // Responsive board sizing
  const screenDimensions = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const availableWidth = width - 40; // padding
    const boardSize = Math.min(340, availableWidth);
    const cellSize = Math.floor((boardSize - 24) / 3); // 8px gap between cells

    return { boardSize, cellSize };
  }, []);

  // Game end effects
  useEffect(() => {
    const { finished, isDraw, result } = gameState;

    if (!finished) {
      finishedOnce.current = false;
      return;
    }
    if (finishedOnce.current) return;
    finishedOnce.current = true;

    if (result.winner) {
      setStats(s => ({
        ...s,
        [result.winner as 'X' | 'O']: s[result.winner as 'X' | 'O'] + 1,
      }));
      ToastAndroid.show(
        `🎉 Game Over Player ${result.winner} wins!`,
        ToastAndroid.SHORT,
      );
      setConfetti(true);
      setTimeout(() => setConfetti(false), 10000);
    } else if (isDraw) {
      setStats(s => ({ ...s, draws: s.draws + 1 }));
    }
  }, [gameState.finished, gameState.isDraw, gameState.result.winner, setStats]);

  // CPU move with performance optimization
  useEffect(() => {
    if (!vsCpu || gameState.finished || gameState.currentPlayer !== aiSymbol)
      return;

    const timeoutId = setTimeout(() => {
      const idx = bestMove(board, aiSymbol, difficulty);
      if (idx !== null && board[idx] === null) {
        setBoard(prev => {
          if (prev[idx] !== null) return prev;
          const next = [...prev];
          next[idx] = aiSymbol;
          return next;
        });
      }
    }, 300); // Slightly faster response

    return () => clearTimeout(timeoutId);
  }, [
    vsCpu,
    gameState.finished,
    gameState.currentPlayer,
    aiSymbol,
    board,
    difficulty,
  ]);

  const handleCellPress = useCallback(
    (index: number) => {
      if (gameState.finished || board[index] !== null) return;
      if (vsCpu && gameState.currentPlayer !== humanPlaysAs) return;

      setBoard(prev => {
        if (prev[index] !== null) return prev;
        const next = [...prev];
        next[index] = gameState.currentPlayer;
        return next;
      });
    },
    [board, gameState.currentPlayer, gameState.finished, vsCpu, humanPlaysAs],
  );

  const newGame = useCallback(() => {
    setBoard(Array(9).fill(null));
  }, []);

  const resetStats = useCallback(() => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all game statistics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => setStats({ X: 0, O: 0, draws: 0 }),
        },
      ],
    );
  }, [setStats]);

  // Optimized cell styling with NativeWind
  const getCellStyle = useCallback(
    (idx: number, cell: Cell) => {
      const isWinning = gameState.winningLine.includes(idx);
      const isDark = colorScheme === 'dark';

      if (cell === 'X') {
        return `rounded-xl items-center justify-center mb-2 bg-emerald-600 ${
          isWinning ? 'border-2 border-lime-600' : ''
        }`;
      }
      if (cell === 'O') {
        return `rounded-xl items-center justify-center mb-2 bg-red-600 ${
          isWinning ? 'border-2 border-lime-600' : ''
        }`;
      }
      return `rounded-xl items-center justify-center mb-2 ${
        isDark 
          ? 'bg-neutral-900 border border-neutral-600' 
          : 'bg-white border border-gray-200'
      }`;
    },
    [gameState.winningLine, colorScheme],
  );

  const statusLabel = gameState.finished
    ? gameState.result.winner
      ? `Winner: ${gameState.result.winner}`
      : 'Draw'
    : `Turn: ${gameState.currentPlayer}`;

  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-neutral-900' : 'bg-gray-100'}`}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
    
      
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
          <Image 
        source={require('../../assets/image/removed-logo.png')} 
        className='w-20 h-20'
      />
        {/* Header */}
        <View className="items-center">
          <Text className={`text-3xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Tic Tac Toe
          </Text>
        </View>

        {/* Game Settings */}
        <View className="mb-5">
          {/* Statistics */}
          <View className={`p-5 rounded-3xl shadow-lg mb-5 ${
            isDark ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <Text className={`text-2xl font-extrabold text-center mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              🏆 Game Statistics
            </Text>
            
            <View className="flex-row gap-3">
              <View className="flex-1 bg-emerald-600 rounded-xl p-4 items-center">
                <Text className="text-white text-xs font-bold mb-1">Player X</Text>
                <Text className="text-white text-3xl font-extrabold">{stats.X}</Text>
              </View>
              
              <View className="flex-1 bg-orange-500 rounded-xl p-4 items-center">
                <Text className="text-white text-xs font-bold mb-1">Draws</Text>
                <Text className="text-white text-3xl font-extrabold">{stats.draws}</Text>
              </View>
              
              <View className="flex-1 bg-red-600 rounded-xl p-4 items-center">
                <Text className="text-white text-xs font-bold mb-1">Player O</Text>
                <Text className="text-white text-3xl font-extrabold">{stats.O}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Game Board */}
        <View className="items-center mb-6">
          {/* Game Status */}
          <View className="items-center mb-5">
            <View className={`px-4 py-2 rounded-full ${
              gameState.finished
                ? gameState.result.winner
                  ? 'bg-lime-600'
                  : 'bg-orange-500'
                : gameState.currentPlayer === 'X'
                ? 'bg-emerald-600'
                : 'bg-red-600'
            }`}>
              <Text className="text-white font-bold">{statusLabel}</Text>
            </View>
          </View>

          <View 
            className={`p-3 rounded-3xl shadow-xl ${isDark ? 'bg-neutral-800' : 'bg-white'}`}
            style={{
              width: screenDimensions.boardSize,
              height: screenDimensions.boardSize,
            }}
          >
            <View className="flex-row flex-wrap justify-between content-between">
              {board.map((cell, idx) => {
                const disabled =
                  gameState.finished ||
                  cell !== null ||
                  (vsCpu && gameState.currentPlayer !== humanPlaysAs);
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleCellPress(idx)}
                    disabled={disabled}
                    activeOpacity={0.7}
                    className={getCellStyle(idx, cell)}
                    style={{
                      width: screenDimensions.cellSize,
                      height: screenDimensions.cellSize,
                    }}
                  >
                    <Text className={`text-4xl font-extrabold ${
                      cell 
                        ? 'text-white' 
                        : isDark 
                          ? 'text-neutral-500' 
                          : 'text-gray-400'
                    }`}>
                      {cell || ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Control Buttons */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={newGame}
            className="flex-1 bg-emerald-600 py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-base font-bold">🔄 New Game</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={resetStats}
            className="flex-1 bg-red-600 py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-base font-bold">🗑️ Reset Stats</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View className="mb-5">
          <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Settings
          </Text>
          
          <View className="flex-row items-center justify-between mb-3">
            <Text className={`text-base font-semibold ${
              isDark ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Play vs CPU
            </Text>
            <Switch value={vsCpu} onValueChange={setVsCpu} />
          </View>
          
          <View className="flex-row gap-4">
            {/* Player Symbol Selection */}
            <View className="flex-1">
              <Text className={`text-xs font-medium mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                You play as
              </Text>
              
              <View className={`flex-row rounded-xl overflow-hidden ${
                isDark ? 'bg-neutral-800' : 'bg-white'
              }`}>
                {(['X', 'O'] as const).map(symbol => {
                  const active = humanPlaysAs === symbol;
                  return (
                    <Pressable
                      key={symbol}
                      onPress={() => setHumanPlaysAs(symbol)}
                      disabled={!gameState.finished}
                      className={`flex-1 items-center py-2 ${
                        active 
                          ? isDark 
                            ? 'bg-neutral-600' 
                            : 'bg-gray-200'
                          : ''
                      }`}
                    >
                      <Text className={`text-xs font-bold ${
                        active 
                          ? isDark 
                            ? 'text-white' 
                            : 'text-gray-900'
                          : isDark
                            ? 'text-gray-400'
                            : 'text-gray-600'
                      }`}>
                        {symbol}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Difficulty Selection */}
            {vsCpu && (
              <View className="flex-1">
                <Text className={`text-xs font-medium mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  CPU Difficulty
                </Text>
                
                <View className={`flex-row rounded-xl overflow-hidden ${
                  isDark ? 'bg-neutral-800' : 'bg-white'
                }`}>
                  {(['easy', 'unbeatable'] as const).map(level => {
                    const active = difficulty === level;
                    return (
                      <Pressable
                        key={level}
                        onPress={() => setDifficulty(level)}
                        className={`flex-1 items-center py-2 ${
                          active 
                            ? isDark 
                              ? 'bg-neutral-600' 
                              : 'bg-gray-200'
                            : ''
                        }`}
                      >
                        <Text className={`text-xs font-bold capitalize ${
                          active 
                            ? isDark 
                              ? 'text-white' 
                              : 'text-gray-900'
                            : isDark
                              ? 'text-gray-400'
                              : 'text-gray-600'
                        }`}>
                          {level}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Confetti */}
      {confetti && (
        <ConfettiCannon
          count={300}
          origin={{ x: 0, y: 0 }}
          fadeOut
        />
      )}
    </SafeAreaView>
  );
}