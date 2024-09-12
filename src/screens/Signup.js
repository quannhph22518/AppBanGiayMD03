import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { colors } from '../constains/colors';
import { fontsize } from "../constains/fontsize";

const Signup = () => {
  const navigation = useNavigation();
  
  const [secureEntry, setSecureEntry] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSignup = async () => {
    let valid = true;

    if (!firstName) {
      setFirstNameError("Tên không được để trống");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Họ không được để trống");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email không được để trống");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!phone) {
      setPhoneError("Số điện thoại không được để trống");
      valid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm cả chữ và số");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    const userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      mobile: phone,
    };

    try {
      const response = await fetch('http://192.168.1.9:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        ToastAndroid.show(errorData.message || "Failed to create account", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Failed to create account. Please try again later.", ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Tạo tài khoản</Text>
        <Text style={styles.headingText1}>Hãy cùng nhau tạo tài khoản</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, firstNameError ? styles.inputError : null]}>
          <Ionicons name={"person-outline"} size={30} color={firstNameError ? 'red' : colors.secondary} />
          <TextInput
            style={[styles.textInput, firstNameError ? styles.textInputError : null]}
            placeholder="Nhập tên của bạn"
            placeholderTextColor={firstNameError ? 'red' : colors.secondary}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError('');
            }}
          />
        </View>
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
        <View style={[styles.inputContainer, lastNameError ? styles.inputError : null]}>
          <Ionicons name={"person-outline"} size={30} color={lastNameError ? 'red' : colors.secondary} />
          <TextInput
            style={[styles.textInput, lastNameError ? styles.textInputError : null]}
            placeholder="Nhập họ của bạn"
            placeholderTextColor={lastNameError ? 'red' : colors.secondary}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError('');
            }}
          />
        </View>
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
        <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
          <Ionicons name={"mail-outline"} size={30} color={emailError ? 'red' : colors.secondary} />
          <TextInput
            style={[styles.textInput, emailError ? styles.textInputError : null]}
            placeholder="Nhập email của bạn"
            placeholderTextColor={emailError ? 'red' : colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
          <SimpleLineIcons name={"lock"} size={30} color={passwordError ? 'red' : colors.secondary} />
          <TextInput
            style={[styles.textInput, passwordError ? styles.textInputError : null]}
            placeholder="Nhập password của bạn"
            placeholderTextColor={passwordError ? 'red' : colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <Ionicons name={secureEntry ? "eye-off" : "eye"} size={20} color={passwordError ? 'red' : colors.secondary} />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={[styles.inputContainer, phoneError ? styles.inputError : null]}>
          <SimpleLineIcons name={"screen-smartphone"} size={30} color={phoneError ? 'red' : colors.secondary} />
          <TextInput
            style={[styles.textInput, phoneError ? styles.textInputError : null]}
            placeholder="Nhập số điện thoại của bạn"
            placeholderTextColor={phoneError ? 'red' : colors.secondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setPhoneError('');
            }}
          />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.loginText}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>hoặc tiếp tục với</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../images/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Bạn có sẵn để tạo một tài khoản !</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fontsize.SemiBold,
  },
  headingText1: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fontsize.Regular,
    textAlign: 'center',
    marginVertical: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
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
    textAlign: "right",
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
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fontsize.Regular,
    color: colors.secondary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.secondary,
    fontFamily: fontsize.Regular,
    marginRight: 10
  },
  signupText: {
    color: colors.primary,
    fontFamily: fontsize.Bold,
  },
});
