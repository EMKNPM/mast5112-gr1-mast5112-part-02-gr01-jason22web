import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderTitle } from 'expo-router/build/react-navigation';

export default function AddDishScreen() {
  //stating variable for form inputs
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');
  //stating variables for error messagess..
  const [error, setError] = useState('');

  const handleAddDish = () => {
    if (!name.trim() || !description.trim() || !course.trim() || !price.trim()) {
      setError('Please fill in all fields before adding the dish.')
      return;
    }

    setError('');

    //Clear previos error
    router.push({
      pathname: '/',
      params: {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    },
  });
};
return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Add New Menu Item</Text>

    {error ? <Text style={styles.errorText}>{error}</Text> : null}

    <TextInput
      style={styles.input}
      placeholder="e.g., Garlic Butter Steak..."
      value={name}
      onChangeText={setName}
    />

    <TextInput
      style={[styles.input, styles.textArea]}
      placeholder="e.g., Tender ribeye steak grilled to perfection basted in garlic butter..."
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={4}
    />

    <View style={styles.row}>

      <TextInput
        style={[styles.input, styles.inputSecondary]}
        placeholder="e.g., Starter, Main, Dessert..."
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={[styles.input, styles.inputSecondary]}
        placeholder="e.g., 150..."
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
    </View>
    <View style={styles.row}>
      {/* Add and Cancel Buttons */}
      <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, styles.submitButton]} onPress={handleAddDish}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </TouchableOpacity>
      {/* Bottom home Nav Button */}
    </View>

    <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
      <Text style={styles.homeButtonText}>Home</Text>
    </TouchableOpacity>




  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, padding: 20, backgroundColor: '#98949498',
    paddingTop: 40, alignItems: 'center'
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,
    width: '100%'
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20,
    textAlign: 'center', color: '#333'
  },
  input: {
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 25, width: '100%', borderWidth: 1, borderColor: '#ccc',
    marginBottom: 15, fontSize: 16, backgroundColor: '#f9f9f9'
  },
  textArea: {
    height: 100, textAlignVertical: 'top', borderRadius: 20,
    paddingTop: 12
  },
  inputSecondary: {
    width: '48%', marginBottom: 0,
  },
  actionButton: {
    width: '48%', alignItems: 'center', padding: 14,
    borderRadius: 25, borderWidth: 1, borderColor: '#ccc',
    backgroundColor: '#e6e6e6'
  },
  cancelButton: {
    backgroundColor: '#ba7d7d',
  },
  submitButton: {
    backgroundColor: '#79ad74'
  },
  buttonText: {
    fontSize: 15, color: '#ffffff', fontWeight: 'bold'
  },
  errorText: {
    color: 'red', marginBottom: 15, textAlign: 'center',
    fontWeight: 'bold'
  },
  homeButtonText: {
    fontWeight: 'bold', color: '#333', fontSize: 15
  },
  homeButton: {
    marginTop: 10, paddingVertical: 12, paddingHorizontal: 40,
    borderRadius: 25, borderWidth: 1, borderColor: '#aaa',
    backgroundColor: '#ffffff', alignItems: 'center',
    alignSelf: 'center', width: 160,
  },
});