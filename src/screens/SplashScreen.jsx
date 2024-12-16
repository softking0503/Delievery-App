import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  const simulateLoading = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start(async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });
  };

  useEffect(() => {
    progress.addListener((p) => {
      setPercentage(Math.round(p.value));
    });

    simulateLoading();

    return () => {
      progress.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        // source={{ uri: 'https://i.postimg.cc/SRB6R1nh/motorcycle.png' }}
        source={require('../../assets/motorcycle.png')}  // Replace with your actual logo path
        style={styles.logo}
      />
      <Text style={styles.title}>BELLY BASKET</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressCircle, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.percentageTextBelow}>{percentage}% Loaded</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  logo: {
    width: 150, // Adjust the size of the logo as necessary
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black text
    marginBottom: 40,
  },
  progressContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0', // Gray background for progress bar
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 30,
  },
  progressCircle: {
    height: '100%',
    backgroundColor: '#53a20e', // Color of the progress bar
    borderRadius: 5,
  },
  percentageTextBelow: {
    marginTop: 20,
    fontSize: 18,
    color: '#53a20e', // Match the color with the progress bar
    fontWeight: 'bold',
  },
});

