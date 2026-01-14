import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedModal } from './ui/AnimatedModal';
import { ThemeColors, Difficulty, PlayerSymbol } from '../types/game';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  colors: ThemeColors;
  isDark: boolean;
  onSwitchTheme: () => void;
  vsCpu: boolean;
  onSetVsCpu: (value: boolean) => void;
  humanPlaysAs: PlayerSymbol;
  onSetHumanPlaysAs: (value: PlayerSymbol) => void;
  difficulty: Difficulty;
  onSetDifficulty: (value: Difficulty) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  colors,
  isDark,
  onSwitchTheme,
  vsCpu,
  onSetVsCpu,
  humanPlaysAs,
  onSetHumanPlaysAs,
  difficulty,
  onSetDifficulty,
}) => {
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
        <Icon name="cog" size={28} color={colors.text} />
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          Settings
        </Text>
      </View>
      <ScrollView
        style={styles.settingsModalContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.settingRow, { borderBottomColor: colors.cardBorder }]}
        >
          <View style={styles.settingLabelRow}>
            <Icon
              name={isDark ? 'weather-night' : 'white-balance-sunny'}
              size={22}
              color={colors.text}
            />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Text
                style={[styles.settingDescription, { color: colors.textMuted }]}
              >
                Switch between themes
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={onSwitchTheme}
            trackColor={{ false: '#767577', true: '#0072ff' }}
            thumbColor={isDark ? '#00c6ff' : '#f4f3f4'}
          />
        </View>
        <View
          style={[styles.settingRow, { borderBottomColor: colors.cardBorder }]}
        >
          <View style={styles.settingLabelRow}>
            <Icon name="robot" size={22} color={colors.text} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Play vs CPU
              </Text>
              <Text
                style={[styles.settingDescription, { color: colors.textMuted }]}
              >
                Play against the computer
              </Text>
            </View>
          </View>
          <Switch
            value={vsCpu}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            onValueChange={onSetVsCpu}
            trackColor={{ false: '#767577', true: '#0072ff' }}
            thumbColor={vsCpu ? '#00c6ff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.optionSection}>
          <View style={styles.optionHeader}>
            <Icon name="account" size={22} color={colors.text} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                You play as
              </Text>
              <Text
                style={[styles.settingDescription, { color: colors.textMuted }]}
              >
                Choose your symbol
              </Text>
            </View>
          </View>
          <View style={styles.optionRow}>
            {(['X', 'O'] as const).map((symbol) => {
              const active = humanPlaysAs === symbol;
              return (
                <TouchableOpacity
                  key={symbol}
                  onPress={() => onSetHumanPlaysAs(symbol)}
                  activeOpacity={0.8}
                  style={styles.optionButtonWrapper}
                >
                  {active ? (
                    <LinearGradient
                      colors={
                        symbol === 'X'
                          ? ['#00c6ff', '#0072ff']
                          : ['#f857a6', '#ff5858']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.optionButton}
                    >
                      <Text style={styles.optionButtonTextActive}>{symbol}</Text>
                    </LinearGradient>
                  ) : (
                    <View
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor: colors.cardBg,
                          borderWidth: 1,
                          borderColor: colors.cardBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          { color: colors.textMuted },
                        ]}
                      >
                        {symbol}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {vsCpu && (
          <View style={styles.optionSection}>
            <View style={styles.optionHeader}>
              <Icon name="lightning-bolt" size={22} color={colors.text} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  CPU Difficulty
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: colors.textMuted },
                  ]}
                >
                  Choose challenge level
                </Text>
              </View>
            </View>
            <View style={styles.optionRow}>
              {(['easy', 'unbeatable'] as const).map((level) => {
                const active = difficulty === level;
                return (
                  <TouchableOpacity
                    key={level}
                    onPress={() => onSetDifficulty(level)}
                    activeOpacity={0.8}
                    style={styles.optionButtonWrapper}
                  >
                    {active ? (
                      <LinearGradient
                        colors={
                          level === 'easy'
                            ? ['#00d9ff', '#00ff88']
                            : ['#f7971e', '#ffd200']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.optionButton}
                      >
                        <View style={styles.optionButtonContent}>
                          <Icon
                            name={
                              level === 'easy'
                                ? 'emoticon-happy-outline'
                                : 'fire'
                            }
                            size={18}
                            color="#ffffff"
                          />
                          <Text style={styles.optionButtonTextActive}>
                            {level === 'easy' ? 'Easy' : 'Hard'}
                          </Text>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.optionButton,
                          {
                            backgroundColor: colors.cardBg,
                            borderWidth: 1,
                            borderColor: colors.cardBorder,
                          },
                        ]}
                      >
                        <View style={styles.optionButtonContent}>
                          <Icon
                            name={
                              level === 'easy'
                                ? 'emoticon-happy-outline'
                                : 'fire'
                            }
                            size={18}
                            color={colors.textMuted}
                          />
                          <Text
                            style={[
                              styles.optionButtonText,
                              { color: colors.textMuted },
                            ]}
                          >
                            {level === 'easy' ? 'Easy' : 'Hard'}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* About Section */}
        <View style={[styles.aboutSection, { borderTopColor: colors.cardBorder }]}>
          <View style={styles.optionHeader}>
            <Icon name="information-outline" size={22} color={colors.text} />
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              About
            </Text>
          </View>

          {/* About App */}
          <View style={[styles.aboutCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.aboutCardHeader}>
              <LinearGradient
                colors={['#00c6ff', '#0072ff']}
                style={styles.aboutIconContainer}
              >
                <Icon name="gamepad-variant" size={24} color="#ffffff" />
              </LinearGradient>
              <View style={styles.aboutCardInfo}>
                <Text style={[styles.aboutCardTitle, { color: colors.text }]}>
                  XO - Tic Tac Toe
                </Text>
                <Text style={[styles.aboutCardVersion, { color: colors.textMuted }]}>
                  Version 1.0.0
                </Text>
              </View>
            </View>
            <Text style={[styles.aboutCardDescription, { color: colors.textSecondary }]}>
              A beautifully crafted Tic Tac Toe game with smart CPU opponent, 
              multiple difficulty levels, and detailed statistics tracking.
            </Text>
          </View>

          {/* About Developer */}
          <View style={[styles.aboutCard, { backgroundColor: colors.cardBg, marginTop: 12 }]}>
            <View style={styles.aboutCardHeader}>
              <LinearGradient
                colors={['#f857a6', '#ff5858']}
                style={styles.aboutIconContainer}
              >
                <Icon name="account" size={24} color="#ffffff" />
              </LinearGradient>
              <View style={styles.aboutCardInfo}>
                <Text style={[styles.aboutCardTitle, { color: colors.text }]}>
                  Developer
                </Text>
                <Text style={[styles.aboutCardVersion, { color: colors.textMuted }]}>
                  Subrahmanian
                </Text>
              </View>
            </View>
            <Text style={[styles.aboutCardDescription, { color: colors.textSecondary }]}>
              Passionate mobile developer creating delightful user experiences.
            </Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: colors.cardBorder }]}
                onPress={() => Linking.openURL('https://github.com/Subrxmanian')}
                activeOpacity={0.7}
              >
                <Icon name="github" size={20} color={colors.text} />
                <Text style={[styles.socialButtonText, { color: colors.text }]}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: colors.cardBorder }]}
                onPress={() => Linking.openURL('https://github.com/Subrxmanian/XO')}
                activeOpacity={0.7}
              >
                <Icon name="source-repository" size={20} color={colors.text} />
                <Text style={[styles.socialButtonText, { color: colors.text }]}>Source</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={[styles.aboutSection, { borderTopColor: colors.cardBorder }]}>
          <View style={styles.optionHeader}>
            <Icon name="heart-outline" size={22} color={colors.text} />
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Support
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              const upiId = 'srianandhavelmsubramanian@okhdfcbank';
              const name = 'Subrahmanian';
              const note = 'Support XO App Development';
              const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&cu=INR`;
              Linking.openURL(upiUrl).catch(() => {
                Linking.openURL('https://portfolio-two-gold-buhmqk9wiq.vercel.app/');
              });
            }}
            style={styles.supportCard}
          >
            <LinearGradient
              colors={['#FFDD00', '#FBB034']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.supportCardGradient}
            >
              <View style={styles.coffeeIconContainer}>
                <Icon name="coffee" size={28} color="#000000" />
              </View>
              <View style={styles.supportCardInfo}>
                <Text style={styles.supportCardTitle}>Buy Me a Coffee</Text>
                <Text style={styles.supportCardDescription}>
                  Support the development
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#000000" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={[styles.aboutSection, { borderTopColor: colors.cardBorder }]}>
          <View style={styles.optionHeader}>
            <Icon name="email-outline" size={22} color={colors.text} />
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Contact
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Linking.openURL('https://portfolio-two-gold-buhmqk9wiq.vercel.app/')}
            style={styles.supportCard}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.supportCardGradient}
            >
              <View style={[styles.coffeeIconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Icon name="web" size={28} color="#ffffff" />
              </View>
              <View style={styles.supportCardInfo}>
                <Text style={[styles.supportCardTitle, { color: '#ffffff' }]}>Portfolio</Text>
                <Text style={[styles.supportCardDescription, { color: 'rgba(255,255,255,0.8)' }]}>
                  View my work & contact me
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  settingsModalContent: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  optionSection: {
    marginTop: 20,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButtonWrapper: {
    flex: 1,
  },
  optionButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  optionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionButtonTextActive: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  aboutSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  aboutCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  aboutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  aboutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutCardInfo: {
    flex: 1,
  },
  aboutCardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  aboutCardVersion: {
    fontSize: 13,
    marginTop: 2,
  },
  aboutCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  supportCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 12,
  },
  supportCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  coffeeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportCardInfo: {
    flex: 1,
  },
  supportCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  supportCardDescription: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 2,
  },
});
