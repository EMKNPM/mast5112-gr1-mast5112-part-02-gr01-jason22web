import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

// Global array
let globalMenuItems: MenuItem[] = [];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Local state to store active menu items
  const [menuItem, setMenuItem] = useState<MenuItem[]>(globalMenuItems);

  // Adds newly added dishes
  useEffect(() => {
    if (params.name && params.id) {
      const newId = params.id as string;
      const exists = globalMenuItems.some((item) => item.id == newId);

      if (!exists) {
        const newDish: MenuItem = {
          id: newId,
          name: params.name as string,
          description: params.description as string,
          course: params.course as string,
          price: params.price as string,
        };

        // Add to list if it doesn't exist already
        globalMenuItems = [newDish, ...globalMenuItems];
        setMenuItem([...globalMenuItems]);
      }
    }
  }, [params]);

  return (
    <View style={styles.container}>
      {/* Application Title */}
      <Text style={styles.title}>Chef's Menu Manager</Text>

      {/* Navigation buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.Button, styles.addDishButton]}
          onPress={() => router.push('/add-dish')}>
          <Text style={styles.ButtonText}>Add New Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Button, styles.statisticsButton]}
          onPress={() => router.push('/statistics')}>
          <Text style={styles.ButtonText}>Nothing yet</Text>
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
  container: {
    flex: 1, padding: 20, backgroundColor: '#98949498',
    paddingTop: 50
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
    textAlign: 'center'
  },
  Button: {
    padding: 12, borderRadius: 8, width: '48%',
    alignItems: 'center'
  },
  addDishButton: {
    backgroundColor: '#3d78b7'
  },
  statisticsButton: {
    backgroundColor: '#385a77'
  },
  ButtonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16
  },
  subHeading: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10
  },
  emptyText: {
    fontStyle: 'italic', color: '#666', textAlign: 'center',
    marginTop: 20
  },
  card: {
    padding: 15, borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd', marginBottom: 12,
    backgroundColor: '#f9f9f9'
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5
  },
  dishName: {
    fontWeight: 'bold', fontSize: 16
  },
  dishPrice: {
    fontWeight: 'bold', fontSize: 16, color: '#28a745'
  },
  description: {
    color: '#444', marginBottom: 5
  },
  courseTags: {
    fontSize: 12, color: '#666', fontStyle: 'italic'
  },
});