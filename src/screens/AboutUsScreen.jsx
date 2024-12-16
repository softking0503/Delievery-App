import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

export default function AboutUsScreen() {
  const navigation = useNavigation();
  const swiperRef = useRef(null); // Reference for Swiper
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current page index

  const pages = [
    {
      title: "All your favorites",
      description: "Get all your loved foods in one place, you just place the order and we do the rest.",
      image: { uri: 'https://i.postimg.cc/6Qb75nXB/Illustration.png' }, // Replace with your local image path
    },
    {
      title: "Order from chosen chef",
      description: "Get all your loved foods in one place, you just place the order and we do the rest.",
      image: { uri: 'https://i.postimg.cc/g02XW41M/Illustration-1.png' }, // Replace with your local image path
    },
    {
      title: "Free delivery offers",
      description: "Get all your loved foods in one place, you just place the order and we do the rest.",
      image: { uri: 'https://i.postimg.cc/XY8Gmt1G/Illustration-2.png' }, // Replace with your local image path
    }
  ];

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      swiperRef.current.scrollBy(1); // Move to the next slide
    } else {
      navigation.navigate('MainScreen'); // Navigate to the main screen on the last page
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index); // Update the current index when page changes
  };

  return (
    <Swiper
      ref={swiperRef}
      onIndexChanged={handleIndexChanged} // Track index changes
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.dot} />}
      loop={false} // No looping through the screens
    >
      {pages.map((page, index) => (
        <View style={styles.slide} key={index}>
          <View style={styles.imageContainer}>
            <Image source={page.image} style={styles.image} />
          </View>
          <Text style={styles.title}>{page.title}</Text>
          <Text style={styles.description}>{page.description}</Text>

          {/* Dots container placed above the button */}
          <View style={styles.dotsContainer}>
            <View style={index === 0 ? styles.activeDot : styles.inactiveDot} />
            <View style={index === 1 ? styles.activeDot : styles.inactiveDot} />
            <View style={index === 2 ? styles.activeDot : styles.inactiveDot} />
          </View>

          {index === pages.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("UserScreen")}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#b0b0b0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 15, // Adjust margin to position dots above the "Next" button
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFA500',
    marginHorizontal: 5,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFDFC4',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#FFDFC4',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    display:'none'
  },
  activeDot: {
    backgroundColor: '#FFA500',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});
