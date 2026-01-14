import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface GameResultBannerProps {
  visible: boolean;
  winner: 'X' | 'O' | null;
  isDraw: boolean;
  onHide: () => void;
}

export const GameResultBanner: React.FC<GameResultBannerProps> = ({
  visible,
  winner,
  isDraw,
  onHide,
}) => {
  const slideAnim = useRef(new Animated.Value(-150)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in animation
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, slideAnim, scaleAnim, opacityAnim, onHide]);

  if (!visible) return null;

  const getGradientColors = (): string[] => {
    if (isDraw) return ['#f7971e', '#ffd200'];
    if (winner === 'X') return ['#00c6ff', '#0072ff'];
    return ['#f857a6', '#ff5858'];
  };

  const getMessage = (): string => {
    if (isDraw) return "It's a Draw!";
    return `Player ${winner} Wins!`;
  };

  const getIcon = (): string => {
    if (isDraw) return 'handshake';
    return 'trophy';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <View style={styles.iconContainer}>
          <Icon name={getIcon()} size={28} color="#ffffff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{getMessage()}</Text>
          <Text style={styles.subtitle}>
            {isDraw ? 'Great game!' : '🎉 Congratulations!'}
          </Text>
        </View>
        {!isDraw && (
          <View style={styles.symbolBadge}>
            <Text style={styles.symbolText}>{winner}</Text>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
    elevation: 10,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  symbolBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
});
