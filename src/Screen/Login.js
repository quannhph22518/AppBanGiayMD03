import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constains/colors';
import {fontsize} from '../constains/fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const handlePassW = () => {
    navigation.navigate('');
  };
  const handleProF =() =>{
    navigation.navigate('PROFILE')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={'arrow-back-outline'}
          color={colors.primary}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hello Again!</Text>
        <Text style={styles.headingText2}>
          Welcome Back You’ve Been Missed!
        </Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntery}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery(prev => !prev);
            }}>
            <SimpleLineIcons name={'eye'} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handlePassW}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProF} style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Singup</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require('../img/google.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}> Sign in with google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 80,
    // Để view chứa văn bản có kích thước linh hoạt
    justifyContent: 'center', // Căn giữa theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    // marginTop: 20, // Để tạo khoảng cách với phần trên
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
  },
  headingText2: {
    marginTop: 20,
    fontSize: 18,
    // color: colors.primary,
    // fontFamily: fonts.Regular,
    marginTop: 10, // Để tạo khoảng cách giữa hai dòng văn bản
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fontsize.Light,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fontsize.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fontsize.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fontsize.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fontsize.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
  },
});
