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
      <link href="/add-dish" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Dish</Text>
        </TouchableOpacity>
      </link>
      <link>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Statistics Screen</Text>
        </TouchableOpacity>
      </link>
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
              <View>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>R{item.price}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.courseTage}>Course: {item.course}</Text>
            </View>
          )}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create ({
  
})