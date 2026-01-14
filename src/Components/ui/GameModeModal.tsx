import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_HEIGHT < 700;

interface GameModeModalProps {
  visible: boolean;
  onSelectMode: (vsCpu: boolean) => void;
}

export const GameModeModal: React.FC<GameModeModalProps> = ({
  visible,
  onSelectMode,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.content}>
              {/* Logo/Title */}
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#00c6ff', '#0072ff']}
                  style={styles.logoBackground}
                >
                  <Text style={styles.logoText}>XO</Text>
                </LinearGradient>
                <Text style={styles.title}>Tic Tac Toe</Text>
                <Text style={styles.subtitle}>Choose your game mode</Text>
              </View>

              {/* Mode Selection */}
              <View style={styles.modesContainer}>
                {/* VS Computer */}
                <TouchableOpacity
                  style={styles.modeCard}
                  activeOpacity={0.9}
                  onPress={() => onSelectMode(true)}
                >
                  <LinearGradient
                    colors={['#00c6ff', '#0072ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modeCardGradient}
                  >
                    <View style={styles.modeCardRow}>
                      <View style={styles.modeIconContainer}>
                        <Icon name="robot" size={isSmallScreen ? 32 : 40} color="#ffffff" />
                      </View>
                      <View style={styles.modeCardText}>
                        <Text style={styles.modeTitle}>VS Computer</Text>
                        <Text style={styles.modeDescription}>
                          Challenge the AI with Easy or Hard difficulty
                        </Text>
                      </View>
                    </View>
                    <View style={styles.playButton}>
                      <Icon name="play" size={18} color="#0072ff" />
                      <Text style={styles.playButtonText}>Play</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/* VS Friend */}
                <TouchableOpacity
                  style={styles.modeCard}
                  activeOpacity={0.9}
                  onPress={() => onSelectMode(false)}
                >
                  <LinearGradient
                    colors={['#f857a6', '#ff5858']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modeCardGradient}
                  >
                    <View style={styles.modeCardRow}>
                      <View style={styles.modeIconContainer}>
                        <Icon name="account-group" size={isSmallScreen ? 32 : 40} color="#ffffff" />
                      </View>
                      <View style={styles.modeCardText}>
                        <Text style={styles.modeTitle}>VS Friend</Text>
                        <Text style={styles.modeDescription}>
                          Play with a friend on the same device
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.playButton, styles.playButtonPink]}>
                      <Icon name="play" size={18} color="#ff5858" />
                      <Text style={[styles.playButtonText, { color: '#ff5858' }]}>Play</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text style={styles.footer}>Select a mode to start playing</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 24 : 40,
  },
  logoBackground: {
    width: isSmallScreen ? 70 : 90,
    height: isSmallScreen ? 70 : 90,
    borderRadius: isSmallScreen ? 18 : 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 32 : 38,
    fontWeight: '900',
  },
  title: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 26 : 32,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
  },
  modesContainer: {
    width: '100%',
    gap: 14,
  },
  modeCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  modeCardGradient: {
    padding: isSmallScreen ? 16 : 20,
    alignItems: 'center',
  },
  modeCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 14,
  },
  modeIconContainer: {
    width: isSmallScreen ? 56 : 68,
    height: isSmallScreen ? 56 : 68,
    borderRadius: isSmallScreen ? 28 : 34,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  modeCardText: {
    flex: 1,
  },
  modeTitle: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 18 : 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  modeDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '500',
    lineHeight: isSmallScreen ? 16 : 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingVertical: isSmallScreen ? 8 : 10,
    borderRadius: 20,
    gap: 6,
  },
  playButtonPink: {},
  playButtonText: {
    color: '#0072ff',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '700',
  },
  footer: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: isSmallScreen ? 12 : 13,
    marginTop: isSmallScreen ? 20 : 28,
  },
});
