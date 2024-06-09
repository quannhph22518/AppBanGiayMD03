import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constains/colors';

const Welcome = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('LOGIN'); // Chuyển hướng sang màn hình LOGIN
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        <View style={styles.slide}>
          <Image source={require('../img/1.png')} style={styles.logo} />
          <Text style={styles.overlayText}>NIKE</Text>
        </View>
        <View style={styles.slide}>
          <Image source={require('../img/2.png')} style={styles.logo} />
          <Text style={styles.overlayText}>NIKE</Text>
        </View>
        <View style={styles.slide}>
          <Image source={require('../img/3.png')} style={styles.logo} />
          <Text style={styles.overlayText}>NIKE</Text>
          <View style={styles.buttonContainer}>
            <Button title="Get Started" onPress={handleLogin} />
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
    backgroundColor: Colors.white,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Để đảm bảo nội dung được căn giữa
    paddingHorizontal: 20, // Để tạo khoảng cách giữa các cạnh
  },
  
  
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 25, // Bo tròn góc của nút
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
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
