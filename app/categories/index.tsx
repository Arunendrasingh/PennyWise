import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CategoryType } from "@/config/types";
import useCategories from "@/hooks/useCategories";

const iconLibraries = {
  MaterialIcons,
  AntDesign,
};

const Index: React.FC = () => {
  const categories = useCategories();
  // Function to render each category item in a card
  const renderCategoryItem = ({ item }: { item: CategoryType }) => {
    const IconComponent = iconLibraries[item.iconLibrary];
    return (
      <TouchableOpacity style={styles.card}>
        <IconComponent
          name={item.icon}
          size={24}
          color="#007AFF"
          style={styles.icon}
        />
        <Text style={styles.categoryName}>{item.name}</Text>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color="#007AFF"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Category List */}
      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

// Styles for the page components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  arrowIcon: {
    color: "#007AFF",
  },
});

export default Index;
