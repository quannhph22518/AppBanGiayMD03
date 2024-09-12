import {
    Image,
    LogBox,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {colors} from '../constains/colors';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import {fontsize} from '../constains/fontsize';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  
  const EditProfileScreen = ({navigation, route}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
  
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
    const [phoneError, setPhoneError] = useState('');
    const [isUpdated, setisUpdated] = useState(false);
    const validateEmail = email => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    const validatePhone = phone => {
      const regex = /^[0-9]{10}$/;
      return regex.test(phone);
    };
  
    async function fetchUserData() {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhone = await AsyncStorage.getItem('mobile');
        const storedFirstname = await AsyncStorage.getItem('firstname');
        const storedLastname = await AsyncStorage.getItem('lastname');
  
        setFirstName(storedFirstname || '');
        setLastName(storedLastname || '');
        setEmail(storedEmail || '');
        setPhone(storedPhone || '');
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage', error);
      }
    }
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const handleSignup = async () => {
      let valid = true;
  
      if (!firstName) {
        setFirstNameError('Tên không được để trống');
        valid = false;
      } else {
        setFirstNameError('');
      }
  
      if (!lastName) {
        setLastNameError('Họ không được để trống');
        valid = false;
      } else {
        setLastNameError('');
      }
  
      if (!email) {
        setEmailError('Email không được để trống');
        valid = false;
      } else if (!validateEmail(email)) {
        setEmailError('Email không hợp lệ');
        valid = false;
      } else {
        setEmailError('');
      }
  
      if (!phone) {
        setPhoneError('Số điện thoại không được để trống');
        valid = false;
      } else if (!validatePhone(phone)) {
        setPhoneError('Số điện thoại không hợp lệ');
        valid = false;
      } else {
        setPhoneError('');
      }
  
      if (!valid) {
        return;
      }
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
  
      const user = {
        _id: storedUserId,
        firstname: firstName,
        lastname: lastName,
        email: email,
        mobile: phone,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
  
      try {
        const response = await axios.put(
          'http://192.168.1.9:3000/api/user/edit-user',
          user,
          config,
        );
        if (response.status === 200) {
          ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
          await AsyncStorage.setItem('firstname', user.firstname);
          await AsyncStorage.setItem('lastname', user.lastname);
          await AsyncStorage.setItem('email', user.email);
          await AsyncStorage.setItem('mobile', user.mobile);
          setisUpdated(true);
        }
        else{
            console.log(response);
            
        }
      } catch (error) {
        ToastAndroid.show('Lỗi khi tải cập nhật', ToastAndroid.SHORT);
      }
    };
  
    const onPress = () => {
      route.params.onReturn(isUpdated);
      navigation.goBack();
    };
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={{width: 25}}></View>
        </View>
        <View style={styles.formContainer}>
          <View
            style={[
              styles.inputContainer,
              firstNameError ? styles.inputError : null,
            ]}>
            <Ionicons
              name={'person-outline'}
              size={30}
              color={firstNameError ? 'red' : colors.secondary}
            />
            <TextInput
              style={[
                styles.textInput,
                firstNameError ? styles.textInputError : null,
              ]}
              placeholder="Nhập tên của bạn"
              placeholderTextColor={firstNameError ? 'red' : colors.secondary}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setFirstNameError('');
              }}
            />
          </View>
          {firstNameError ? (
            <Text style={styles.errorText}>{firstNameError}</Text>
          ) : null}
          <View
            style={[
              styles.inputContainer,
              lastNameError ? styles.inputError : null,
            ]}>
            <Ionicons
              name={'person-outline'}
              size={30}
              color={lastNameError ? 'red' : colors.secondary}
            />
            <TextInput
              style={[
                styles.textInput,
                lastNameError ? styles.textInputError : null,
              ]}
              placeholder="Nhập họ của bạn"
              placeholderTextColor={lastNameError ? 'red' : colors.secondary}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setLastNameError('');
              }}
            />
          </View>
          {lastNameError ? (
            <Text style={styles.errorText}>{lastNameError}</Text>
          ) : null}
          <View
            style={[
              styles.inputContainer,
              emailError ? styles.inputError : null,
            ]}>
            <Ionicons
              name={'mail-outline'}
              size={30}
              color={emailError ? 'red' : colors.secondary}
            />
            <TextInput
              style={[
                styles.textInput,
                emailError ? styles.textInputError : null,
              ]}
              placeholder="Nhập email của bạn"
              placeholderTextColor={emailError ? 'red' : colors.secondary}
              keyboardType="email-address"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
  
          <View
            style={[
              styles.inputContainer,
              phoneError ? styles.inputError : null,
            ]}>
            <SimpleLineIcons
              name={'screen-smartphone'}
              size={30}
              color={phoneError ? 'red' : colors.secondary}
            />
            <TextInput
              style={[
                styles.textInput,
                phoneError ? styles.textInputError : null,
              ]}
              placeholder="Nhập số điện thoại của bạn"
              placeholderTextColor={phoneError ? 'red' : colors.secondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setPhoneError('');
              }}
            />
          </View>
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
  
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={handleSignup}>
            <Text style={styles.loginText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default EditProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      paddingHorizontal: 16,
    },
    scrollContent: {
      flexGrow: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#F8F9FA',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
    title: {
      fontSize: 22,
      fontWeight: '500',
      color: '#0D163A',
    },
    formContainer: {
      marginTop: 20,
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
      color: colors.secondary,
    },
    textInputError: {
      color: 'red',
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
      color: colors.secondary,
      fontFamily: fontsize.Regular,
      marginRight: 10,
    },
    signupText: {
      color: colors.primary,
      fontFamily: fontsize.Bold,
    },
  });
  