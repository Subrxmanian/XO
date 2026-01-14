import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  bestMove,
  getWinner,
  isDraw as computeIsDraw,
  type Board,
} from '../lib/Tic-tac-toe';
import { useAsyncStorageState } from '../hooks/use-asynsc';
import { useTheme } from '../hooks/useTheme';
import { Difficulty, PlayerSymbol, GameStats, GameState } from '../types/game';

// Components
import { TopBar } from './TopBar';
import { Header } from './Header';
import { QuickStatsCard } from './QuickStatsCard';
import { StatusBadge } from './StatusBadge';
import { GameBoard } from './GameBoard';
import { ActionButtons } from './ActionButtons';
import { StatsModal } from './StatsModal';
import { SettingsModal } from './SettingsModal';
import { GameResultBanner } from './ui/GameResultBanner';
import { GameModeModal } from './ui/GameModeModal';
import { AboutModal } from './ui/AboutModal';

export default function Main() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const [showModeSelection, setShowModeSelection] = useState(true);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [vsCpu, setVsCpu] = useAsyncStorageState<boolean>('ttt:vsCpu', true);
  const [difficulty, setDifficulty] = useAsyncStorageState<Difficulty>(
    'ttt:difficulty',
    'unbeatable'
  );
  const [humanPlaysAs, setHumanPlaysAs] = useAsyncStorageState<PlayerSymbol>(
    'ttt:human',
    'X'
  );
  const [stats, setStats] = useAsyncStorageState<GameStats>('ttt:stats', {
    X: 0,
    O: 0,
    draws: 0,
  });

  const { isDark, switchTheme, colors } = useTheme();

  const gameState: GameState = useMemo(() => {
    const xCount = board.filter((c) => c === 'X').length;
    const oCount = board.filter((c) => c === 'O').length;
    const xIsNext = xCount === oCount;
    const currentPlayer: PlayerSymbol = xIsNext ? 'X' : 'O';
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

  const aiSymbol: PlayerSymbol = humanPlaysAs === 'X' ? 'O' : 'X';
  const finishedOnce = useRef(false);
  const lastBackPress = useRef<number>(0);
  const [showResultBanner, setShowResultBanner] = useState(false);
  const [resultBannerData, setResultBannerData] = useState<{
    winner: 'X' | 'O' | null;
    isDraw: boolean;
  }>({ winner: null, isDraw: false });

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (showModeSelection) {
        // If mode selection is open, let it close naturally
        return false;
      }
      
      const now = Date.now();
      if (now - lastBackPress.current < 2000) {
        BackHandler.exitApp();
        return true;
      }
      
      lastBackPress.current = now;
      ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showModeSelection]);

  // Handle game end
  useEffect(() => {
    const { finished, isDraw, result } = gameState;
    if (!finished) {
      finishedOnce.current = false;
      return;
    }
    if (finishedOnce.current) return;
    finishedOnce.current = true;
    if (result.winner) {
      setStats((s) => ({
        ...s,
        [result.winner as 'X' | 'O']: s[result.winner as 'X' | 'O'] + 1,
      }));
      setResultBannerData({ winner: result.winner as 'X' | 'O', isDraw: false });
      setShowResultBanner(true);
    } else if (isDraw) {
      setStats((s) => ({ ...s, draws: s.draws + 1 }));
      setResultBannerData({ winner: null, isDraw: true });
      setShowResultBanner(true);
    }
  }, [gameState, setStats]);

  // CPU move
  useEffect(() => {
    if (!vsCpu || gameState.finished || gameState.currentPlayer !== aiSymbol)
      return;
    const timeoutId = setTimeout(() => {
      const idx = bestMove(board, aiSymbol, difficulty);
      if (idx !== null && board[idx] === null) {
        setBoard((prev) => {
          if (prev[idx] !== null) return prev;
          const next = [...prev];
          next[idx] = aiSymbol;
          return next;
        });
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [vsCpu, gameState.finished, gameState.currentPlayer, aiSymbol, board, difficulty]);

  const handleCellPress = useCallback(
    (index: number) => {
      if (gameState.finished || board[index] !== null) return;
      if (vsCpu && gameState.currentPlayer !== humanPlaysAs) return;
      setBoard((prev) => {
        if (prev[index] !== null) return prev;
        const next = [...prev];
        next[index] = gameState.currentPlayer;
        return next;
      });
    },
    [board, gameState.currentPlayer, gameState.finished, vsCpu, humanPlaysAs]
  );

  const newGame = useCallback(() => setBoard(Array(9).fill(null)), []);

  const resetStats = useCallback(() => {
    setStats({ X: 0, O: 0, draws: 0 });
  }, [setStats]);
// console.log("Rendering Main Component",settingsModalVisible);
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <TopBar
          colors={colors}
          onStatsPress={() => setStatsModalVisible(true)}
          onSettingsPress={() => setSettingsModalVisible(true)}
          onAboutPress={() => setAboutModalVisible(true)}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header colors={colors} />

          <QuickStatsCard
            colors={colors}
            stats={stats}
            onPress={() => setStatsModalVisible(true)}
          />

          <StatusBadge gameState={gameState} />

          <GameBoard
            board={board}
            gameState={gameState}
            colors={colors}
            isDark={isDark}
            vsCpu={vsCpu}
            humanPlaysAs={humanPlaysAs}
            onCellPress={handleCellPress}
          />

          <ActionButtons
            onNewGame={newGame}
            onSettings={() =>{
              // console.log("Settings button pressed");
              setSettingsModalVisible(true)}}
          />

          <View style={{ height: 40 }} />
        </ScrollView>

        <StatsModal
          visible={statsModalVisible}
          onClose={() => setStatsModalVisible(false)}
          colors={colors}
          stats={stats}
          onResetStats={resetStats}
        />

        <SettingsModal
          visible={settingsModalVisible}
          onClose={() => setSettingsModalVisible(false)}
          colors={colors}
          isDark={isDark}
          onSwitchTheme={switchTheme}
          vsCpu={vsCpu}
          onSetVsCpu={setVsCpu}
          humanPlaysAs={humanPlaysAs}
          onSetHumanPlaysAs={setHumanPlaysAs}
          difficulty={difficulty}
          onSetDifficulty={setDifficulty}
        />

        <GameResultBanner
          visible={showResultBanner}
          winner={resultBannerData.winner}
          isDraw={resultBannerData.isDraw}
          onHide={() => setShowResultBanner(false)}
        />

        <GameModeModal
          visible={showModeSelection}
          onSelectMode={(selectedVsCpu) => {
            setVsCpu(selectedVsCpu);
            setShowModeSelection(false);
          }}
        />

        <AboutModal
          visible={aboutModalVisible}
          onClose={() => setAboutModalVisible(false)}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
