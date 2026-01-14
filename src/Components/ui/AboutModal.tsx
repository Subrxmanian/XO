import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  visible,
  onClose,
}) => {
  const handleUPIPayment = () => {
    const upiId = 'srianandhavelmsubramanian@okhdfcbank';
    const name = 'Subrahmanian';
    const note = 'Support XO App Development';
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&cu=INR`;
    Linking.openURL(upiUrl).catch(() => {
      Linking.openURL('https://portfolio-two-gold-buhmqk9wiq.vercel.app/');
    });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>About</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* App Logo & Info */}
            <View style={styles.appSection}>
              <LinearGradient
                colors={['#00c6ff', '#0072ff']}
                style={styles.appLogo}
              >
                <Text style={styles.appLogoText}>XO</Text>
              </LinearGradient>
              <Text style={styles.appName}>Tic Tac Toe</Text>
              <Text style={styles.appVersion}>Version 1.1.0</Text>
              <Text style={styles.appDescription}>
                A beautifully crafted Tic Tac Toe game with smart CPU opponent, 
                multiple difficulty levels, and detailed statistics tracking.
              </Text>
            </View>

            {/* Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresList}>
                {[
                  { icon: 'robot', text: 'Smart AI opponent' },
                  { icon: 'account-group', text: 'Play with friends' },
                  { icon: 'chart-bar', text: 'Statistics tracking' },
                  { icon: 'theme-light-dark', text: 'Dark & Light themes' },
                  { icon: 'lightning-bolt', text: 'Multiple difficulty levels' },
                ].map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <LinearGradient
                      colors={['#00c6ff', '#0072ff']}
                      style={styles.featureIcon}
                    >
                      <Icon name={feature.icon} size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={styles.featureText}>{feature.text}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Developer */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Developer</Text>
              <View style={styles.developerCard}>
                <LinearGradient
                  colors={['#f857a6', '#ff5858']}
                  style={styles.developerAvatar}
                >
                  <Icon name="account" size={32} color="#ffffff" />
                </LinearGradient>
                <View style={styles.developerInfo}>
                  <Text style={styles.developerName}>Subrahmanian</Text>
                  <Text style={styles.developerRole}>Mobile Developer</Text>
                </View>
              </View>
              <Text style={styles.developerBio}>
                Passionate about creating delightful mobile experiences. Building apps that people love to use.
              </Text>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://github.com/Subrxmanian')}
                  activeOpacity={0.8}
                >
                  <Icon name="github" size={22} color="#ffffff" />
                  <Text style={styles.socialButtonText}>GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://portfolio-two-gold-buhmqk9wiq.vercel.app/')}
                  activeOpacity={0.8}
                >
                  <Icon name="web" size={22} color="#ffffff" />
                  <Text style={styles.socialButtonText}>Portfolio</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Support */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleUPIPayment}
                style={styles.supportCard}
              >
                <LinearGradient
                  colors={['#FFDD00', '#FBB034']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.supportCardGradient}
                >
                  <View style={styles.supportIconContainer}>
                    <Icon name="coffee" size={32} color="#000000" />
                  </View>
                  <View style={styles.supportInfo}>
                    <Text style={styles.supportTitle}>Buy Me a Coffee</Text>
                    <Text style={styles.supportSubtitle}>
                      Your support keeps this project alive!
                    </Text>
                  </View>
                  <Icon name="heart" size={24} color="#ff5858" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => Linking.openURL('https://github.com/Subrxmanian/XO')}
                style={[styles.supportCard, { marginTop: 12 }]}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.supportCardGradient}
                >
                  <View style={[styles.supportIconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Icon name="star" size={32} color="#ffffff" />
                  </View>
                  <View style={styles.supportInfo}>
                    <Text style={[styles.supportTitle, { color: '#ffffff' }]}>Star on GitHub</Text>
                    <Text style={[styles.supportSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>
                      Show your appreciation with a star
                    </Text>
                  </View>
                  <Icon name="github" size={24} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Made with ❤️ in India</Text>
              <Text style={styles.footerCopyright}>© 2025 Subrahmanian</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  appSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appLogoText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '900',
  },
  appName: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  appVersion: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  appDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 14,
    borderRadius: 14,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  developerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 16,
  },
  developerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  developerRole: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 2,
  },
  developerBio: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  socialRow: {
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    borderRadius: 12,
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  supportCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  supportCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  supportIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  supportSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 4,
  },
  footerCopyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
  },
});
