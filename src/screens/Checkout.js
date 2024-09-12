import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../ultils/AppContext';

const Checkout = ({route, navigation}) => {
  const {token} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [isAddingAddress, setIsAddingAddress] = useState(false); // Trạng thái để theo dõi khi thêm địa chỉ
  const [isModalVisible, setModalVisible] = useState(false);

  const {checkoutData = []} = route.params || {};

  useFocusEffect(
    React.useCallback(() => {
      const loadUserInfo = async () => {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhone = await AsyncStorage.getItem('mobile');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedFirstname = await AsyncStorage.getItem('firstname');
        const storedLastname = await AsyncStorage.getItem('lastname');

        if (storedEmail) setEmail(storedEmail);
        if (storedPhone) setPhone(storedPhone);
        if (storedAddress) setAddress(storedAddress);
        if (storedFirstname) setFirstname(storedFirstname);
        if (storedLastname) setLastname(storedLastname);
      };

      loadUserInfo();

      return () => {};
    }, []),
  );

  const handleSaveAddress = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.9:3000/api/user/save-address',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: address,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save address!');
      }

      const data = await response.json();
      console.log('Address saved successfully:', data);

      await AsyncStorage.setItem('address', address); // Lưu vào bộ nhớ

      setIsAddingAddress(false); // Ẩn trường nhập liệu sau khi lưu thành công

      Alert.alert('Thành công', 'Địa chỉ đã được lưu thành công!');
    } catch (error) {
      console.error('Saving address failed:', error);
      Alert.alert('Lỗi', 'Lưu địa chỉ thất bại: ' + error.message);
    }
  };

  const handleCheckout = async () => {
    if (!address || address.length < 8) {
      alert('Vui lòng nhập địa chỉ với ít nhất 8 ký tự trước khi thanh toán.');
      return;
    }
  
    const products = checkoutData.map(item => ({
      product: item.productId,
      count: item.count,
      color: item.color,
    }));
  
    try {
      const response = await fetch(
        'http://192.168.1.9:3000/api/payment/cash',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            products,
            orderStatus: 'Not Processed',
            address: address,
            totalAmount: calculateTotalCost(),
            phone: phone,
          }),
        },
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }
  
      const data = await response.json();
      console.log('Payment successful:', data);
  
      setModalVisible(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Thanh toán thất bại: ' + error.message);
    }
  };
  
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const formatCurrency = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const calculateTotalCost = () => {
    const productTotal = checkoutData.reduce(
      (total, item) => total + item.price * item.count,
      0,
    );
    return productTotal + 40900; // Phí vận chuyển
  };

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Thanh toán</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông Tin Liên Hệ</Text>
            <View style={styles.infoItem}>
              <Icon name="user" size={20} color="#000" />
              <Text style={styles.input}>
                {firstname} {lastname}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="envelope" size={20} color="#000" />
              <TextInput
                style={styles.input}
                value={email}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.infoItem}>
              <Icon name="phone" size={20} color="#000" />
              <TextInput
                style={styles.input}
                value={phone}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#000" />
              {address && address.length >= 3 && !isAddingAddress ? (
                <>
                  <Text style={styles.input}>{address}</Text>
                  <TouchableOpacity
                    style={styles.addAddressButton}
                    onPress={() => setIsAddingAddress(true)}>
                    <Text style={styles.addAddressText}>Chỉnh sửa địa chỉ</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập địa chỉ của bạn"
                    value={address}
                    onChangeText={text => setAddress(text)}
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveAddress}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông Tin Sản Phẩm</Text>
          {checkoutData.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={[styles.info, {marginLeft: 30}]}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.price}>
                  {formatCurrency(item.price)} VND
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.color, {marginRight: 30}]}>
                    Màu sắc: {item.color}
                  </Text>
                  <Text style={styles.color}>Số lượng: {item.count}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương Thức Thanh Toán</Text>
          <View style={styles.paymentMethod}>
            <Icon name="money" size={20} color="#000" />
            <Text style={styles.paymentText}>
              Thanh toán khi nhận hàng (COD)
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.section}>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Tổng phụ</Text>
              <Text style={styles.info}>
                {formatCurrency(
                  checkoutData.reduce(
                    (total, item) => total + item.price * item.count,
                    0,
                  ),
                )}{' '}
                VND
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Phí Vận Chuyển</Text>
              <Text style={styles.info}>40,900 VND</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Tổng Chi Phí</Text>
              <Text style={styles.totalCost}>
                {formatCurrency(calculateTotalCost())} VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleCheckout}>
              <Text style={styles.paymentButtonText}>Thanh Toán</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../images/thanhcong.jpg')}
                style={styles.modalImage}
              />
              <Text style={styles.modalMessage}>Thanh toán thành công</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Quay lại mua sắm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0D163A',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -75}],
  },
  topSection: {
    flex: 3,
  },
  bottomSection: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
  },
  addAddressButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  totalCost: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  color: {
    fontSize: 14,
    color: '#555',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
