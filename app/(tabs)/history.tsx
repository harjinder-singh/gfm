import { getData } from "@/components/Storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const [history, setHistory] = useState([] as string[]);
  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const historyData = await getData("history");
        setHistory((JSON.parse(historyData as string) as string[]).reverse());
      };

      fetchHistory();
    }, [])
  );

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 flex-col items-center px-4 gap-10 bg-slate-300">
        <Text className="text-6xl mt-24">History</Text>
        <View style={styles.container}>
          {history && (
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCard}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});
