import React, { useRef, useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../ultils/AppContext'; 

const Welcome = () => {
  const { isCheckGetStarted, setIsCheckGetStarted } = useContext(AppContext); 
  const swiperRef = useRef(null);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('isCheckGetStarted', 'true');
      setIsCheckGetStarted(true); 
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const handleNext = () => {
    swiperRef.current.scrollBy(1); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        <View style={styles.slide}>
          <Image source={require('../images/welcome1.png')} style={styles.logo} />
          <Text style={styles.title}>Summer Shoes Nike 2022</Text>
          <Text style={styles.subtitle}>Amet Minim Lit Nodeseru Saku Nandu sit Alique Dolor</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide}>
          <Image source={require('../images/welcome2.png')} style={styles.logo} />
          <Text style={styles.title}>Follow Latest Style Shoes</Text>
          <Text style={styles.subtitle}>There Are Many Beautiful And Attractive Plants To Your Room</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide}>
          <Image source={require('../images/welcome3.png')} style={styles.logo} />
          <Text style={styles.title}>Start Journey With Nike</Text>
          <Text style={styles.subtitle}>Smart, Gorgeous & Fashionable Collection</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  roundButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#999',
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
