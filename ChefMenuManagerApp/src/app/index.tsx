import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string
}

export default function HomeScreen() {
  const [MenuItem, setMenuItem] = useState<MenuItem[]>([]);

  return (
    <View style={styles.container}>
      {/* Application Title */}
      <Text style={styles.title}>Chef's Menu Manager</Text>

      {/* Navigation buttons */}
      <Link href="/add-dish" asChild>
        <TouchableOpacity style={[styles.addButton, styles.addDishButton]}>
          <Text style={styles.addButtonText}>Add New Dish</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/statistics">
        <TouchableOpacity style={[styles.addButton, styles.statisticsButton]}>
          <Text style={styles.addButtonText}>Statistics Screen</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.subHeading}>Current Menu Items:</Text>

      {/* Automatically display the list or a friendly message if empty */}
      {MenuItem.length === 0 ? (
        <Text style={styles.emptyText}>No menu items have been added yet...</Text>
      ) : (
        <FlatList
          data={MenuItem}
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

const styles = StyleSheet.create ({
  container: { flex: 1, padding:20, backgroundColor:'#fff', paddingTop:50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
  addButton: {},
  addDishButton: {},
  statisticsButton: {},
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subHeading: { fontSize: 18},
  emptyText: {fontStyle: 'italic'},
  card: { padding: 15, borderRadius: 8,},
  cardHeader: { flexDirection: 'row', },
  dishName: { fontWeight: 'bold',},
  dishPrice: { fontWeight: 'bold',},
  description: { color: ' #444', marginBottom: 5 },
  courseTags: { fontSize: 12, color: '#666', fontStyle: 'italic' },
});