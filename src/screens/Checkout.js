import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Checkout = () => {
  const [email, setEmail] = useState('rumenhussen@gmail.com');
  const [phone, setPhone] = useState('+88-692-764-269');
  const [address, setAddress] = useState('Newahall St 36, London, 12908 - UK');
  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePhoneChange = text => {
    setPhone(text);
  };
  const handleAddressChange = text => {
    setAddress(text);
  };
  const handleCheckout = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.header}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoItem}>
            <Icon name="envelope" size={20} color="#000" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color="#000" />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={handlePhoneChange}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.addressContainer}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={handleAddressChange}
            />
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentContainer}>
            <Icon name="cc-paypal" size={40} color="#003087" />
            <View>
              <Text style={styles.paymentInfo}>Paypal Card</Text>
              <Text style={styles.paymentInfo}>**** **** **** 4629</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.section}>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.info}>$1250.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.info}>$40.90</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Total Cost</Text>
            <Text style={styles.totalCost}>$1690.99</Text>
          </View>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handleCheckout}>
            <Text style={styles.paymentButtonText}>Payment</Text>
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
            <Text style={styles.modalMessage}>Your Payment Is Successful</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Back To Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  topSection: {
    flex: 3,
  },
  bottomSection: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  map: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentInfo: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginBottom: 20,
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
});
