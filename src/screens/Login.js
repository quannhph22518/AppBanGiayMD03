import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constains/colors';
import {fontsize} from '../constains/fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate('Register');
  };

  const handlePassW = () => {
    navigation.navigate('ForgotPass');
  };

  const handleProF = () => {
    navigation.navigate('PROFILE');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleLogin = async () => {
    let valid = true;
  
    if (!email) {
      setEmailError('Email không được để trống');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ');
      valid = false;
    } else {
      setEmailError('');
    }
  
    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự, bao gồm cả chữ và số');
      valid = false;
    } else {
      setPasswordError('');
    }
  
    if (!valid) {
      return;
    }
  
    // Thực hiện đăng nhập ở đây
    try {
      const response = await fetch('http://192.168.0.149:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      handleProF();
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
    }
  };
  

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
        <Text style={styles.headingText}>Xin Chào </Text>
        <Text style={styles.headingText2}>
          Chào mừng bạn trở lại, chúng tôi rất nhớ bạn!
        </Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
          <Ionicons name={'mail-outline'} size={30} color={emailError ? 'red' : colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={emailError ? 'red' : colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
          <SimpleLineIcons name={'lock'} size={30} color={passwordError ? 'red' : colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={passwordError ? 'red' : colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}>
            <Ionicons name={secureEntry ? "eye-off" : "eye"} size={20} color={passwordError ? 'red' : colors.secondary} />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TouchableOpacity onPress={handlePassW}>
          <Text style={styles.forgotPasswordText}>Khôi phục mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Đăng nhập </Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>hoặc tiếp tục với</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require('../images/google.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}> Sign in with google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Đăng kí miễn phí</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
  },
  headingText2: {
    marginTop: 20,
    fontSize: 18,
    marginTop: 10,
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
  inputError: {
    borderColor: 'red',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fontsize.Light,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
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
    color: colors.secondary,
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
    marginRight: 10,
    color: colors.secondary,
    fontFamily: fontsize.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
  },
});
