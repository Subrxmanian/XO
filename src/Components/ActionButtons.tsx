import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ActionButtonsProps {
  onNewGame: () => void;
  onSettings: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onNewGame,
  onSettings,
}) => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        onPress={onNewGame}
        activeOpacity={0.8}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={['#00c6ff', '#0072ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon name="refresh" size={18} color="#ffffff" />
            <Text style={styles.buttonText}>New Game</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSettings}
        activeOpacity={0.8}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={['#f7971e', '#ffd200']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon name="cog" size={18} color="#ffffff" />
            <Text style={styles.buttonText}>Settings</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
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
});
