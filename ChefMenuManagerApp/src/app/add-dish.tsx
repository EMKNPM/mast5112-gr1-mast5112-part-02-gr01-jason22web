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

    //Clear previos error
    setError('');
    const newDish = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    };

    //Confirmation message and navigate back to home scren to show menu
    Alert.alert('Success', 'Menu item added successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(), //returns the user back to the homescreen
      },
    ]);
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

        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>




      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, padding: 20, backgroundColor: '#fff',
    paddingTop: 40, alignItems: 'center'
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,
    width: '100%'
  },
  title: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 20,
    textAlign: 'center', letterSpacing: 1, color: '#333'
  },
  input: {
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 25, width: '100%', borderWidth: 1, borderColor: '#b0b0b0',
    marginBottom: 15,
    fontSize: 14, backgroundColor: '#f9f9f9'
  },
  textArea: {
    height: 110, textAlignVertical: 'top', borderRadius: 20,
    paddingTop: 12
  },
  inputSecondary: {
    width: '48%', marginBottom: 0,
  },
  actionButton: {
    width: '48%', alignItems: 'center', padding: 12,
    borderRadius: 25, borderWidth: 1, borderColor: '#aaa',
    backgroundColor: '#e6e6e6'
  },
  cancelButton: {
    backgroundColor: '#e8e8e8',
  },
  submitButton: {
    backgroundColor: '#dcdcdc'
  },
  buttonText: {
    fontSize: 13, letterSpacing: 0.5, color: '#333',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red', marginBottom: 15, textAlign: 'center',
    fontWeight: 'bold'
  },
  homeButtonText: {
    fontWeight: 'bold', color: '#333', fontSize: 13
  },
  homeButton: {
    marginTop: 15, paddingVertical: 10, paddingHorizontal: 30,
    borderRadius: 25, borderWidth: 1, borderColor: '#aaa',
    backgroundColor: '#f0f0f0', alignItems: 'center', width: 140,
  },
});