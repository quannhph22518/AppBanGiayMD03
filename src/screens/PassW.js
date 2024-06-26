import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constains/colors';
import {fontsize} from '../constains/fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = () => {
    if (!email) {
      setEmailError('Email không được để trống');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ');
      return;
    } else {
      setEmailError('');
      // Thực hiện tiếp tục xử lý tại đây
      Alert.alert('Success', 'Mã xác minh đã được gửi tới email của bạn');
      // Optionally navigate to another screen
      // navigation.navigate('NEXT_SCREEN');
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
        <Text style={styles.headingText}>Khôi phục mật khẩu</Text>
        <Text style={styles.headingText2}>
        Vui lòng nhập địa chỉ email của bạn để nhận mã xác minh
        </Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
          <Ionicons name={'mail-outline'} size={30} color={emailError ? 'red' : colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Nhập Email"
            placeholderTextColor={emailError ? 'red' : colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleContinue}>
          <Text style={styles.loginText}>Tiếp Tục </Text>
        </TouchableOpacity>
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
    textAlign: 'center', // Thêm thuộc tính này để căn giữa văn bản
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
});
