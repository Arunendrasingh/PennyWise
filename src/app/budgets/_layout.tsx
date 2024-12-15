import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { tuple } from "yup";

export default function Layout() {
  return (
    <Stack
      id="index"
    >
      <Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: '#007AFF',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
    },
    listContainer: {
      flex: 1,
      padding: 16,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
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
      color: '#333',
    },
    arrowIcon: {
      color: '#007AFF',
    },
  });
  