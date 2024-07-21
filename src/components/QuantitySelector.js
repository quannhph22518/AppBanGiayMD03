import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const QuantitySelector = ({ quantity, setQuantity, enabled }) => {
  const increment = () => {
    if (enabled) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (enabled) setQuantity(Math.max(1, quantity - 1));
  };

  return (
    <View style={[styles.container, enabled ? styles.enabledContainer : styles.disabledContainer]}>
      <TouchableOpacity onPress={decrement} style={styles.button} disabled={!enabled}>
        <Icon name="remove" size={20} color={enabled ? "white" : "black"} />
      </TouchableOpacity>
      <Text style={[styles.quantityText, { color: enabled ? "white" : "black" }]}>{quantity}</Text>
      <TouchableOpacity onPress={increment} style={styles.button} disabled={!enabled}>
        <Icon name="add" size={20} color={enabled ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    height: 37
  },
  enabledContainer: {
    backgroundColor: '#2196F3',
  },
  disabledContainer: {
    backgroundColor: '#E0E0E0',
  },
  button: {
    padding: 3,
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default QuantitySelector;
