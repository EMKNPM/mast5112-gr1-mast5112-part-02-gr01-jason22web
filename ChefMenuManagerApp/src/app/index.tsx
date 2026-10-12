import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string
}

export default function HomeScreen() {
  const router = useRouter();
  const [menuItem, setMenuItem] = useState<MenuItem[]>([]);

  return (
    <View style={styles.container}>
      {/* Application Title */}
      <Text style={styles.title}>Chef's Menu Manager</Text>

      {/* Navigation buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.addButton, styles.addDishButton]}
          onPress={() => router.push('/add-dish')}>
          <Text style={styles.addButtonText}>Add New Dish</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[styles.addButton, styles.statisticsButton]}
          onPress={() => router.push('/statistics')}>
          <Text style={styles.addButtonText}>Statistics Screen</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeading}>Current Menu Items:</Text>

      {/* Automatically display the list or a friendly message if empty */}
      {menuItem.length === 0 ? (
        <Text style={styles.emptyText}>No menu items have been added yet...</Text>
      ) : (
        <FlatList
          data={menuItem}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>R{item.price}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.courseTags}>Course: {item.course}</Text>
            </View>
          )}
        />
      )}
    </View>
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