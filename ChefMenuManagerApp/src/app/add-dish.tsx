import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

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
      
      <Text style={styles.label}>Dish Name *</Text>
      <TextInput 
      style={styles.input}
      placeholder="e.g., Garlic Butter Steak..."
      value={name}
      onChangeText={setName}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
      style={styles.input}
      placeholder="e.g., Tender ribeye steak grilled to perfection basted in garlic butter..."
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={3}
      />

      <Text style={styles.label}>Course *</Text>
      <TextInput
      style={styles.input}
      placeholder="e.g., Starter, Main, Dessert..."
      value={course}
      onChangeText={setCourse}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
      style={styles.input}
      placeholder="e.g., 150..."
      value={price}
      onChangeText={setPrice}
      keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleAddDish}>
        <Text style={styles.submitButtonText}>Save Dish</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 50 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  addButton: { padding: 12, borderRadius: 8, width: '25%', alignItems: 'center' },
  addDishButton: { backgroundColor: '#3d78b7' },
  statisticsButton: { backgroundColor: '#385a77' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subHeading: { fontSize: 18 },
  emptyText: { fontStyle: 'italic' },
  card: { padding: 15, borderRadius: 8, },
  cardHeader: { flexDirection: 'row', },
  dishName: { fontWeight: 'bold', },
  dishPrice: { fontWeight: 'bold', },
  description: { color: ' #444', marginBottom: 5 },
  courseTags: { fontSize: 12, color: '#666', fontStyle: 'italic' },
});