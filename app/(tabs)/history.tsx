import { getData } from "@/components/Storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MONTHS } from "@/constants/Common";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HistoryScreen() {
  const [history, setHistory] = useState({} as any);
  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const historyData: any = await getData("history");
        if (historyData) {
          setHistory(JSON.parse(historyData));
        }
      };

      fetchHistory();
    }, [])
  );

  const renderCard = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/search/${item}`)}
    >
      <View className="d-flex flex-row justify-between items-center">
        <Text style={styles.cardTitle}>{item}</Text>
        <IconSymbol
          size={Platform.OS === "ios" ? 16 : 24}
          name="chevron.forward"
          color={"black"}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 flex-col items-center px-4 gap-10 bg-slate-300">
        <Text className="text-5xl text-center mt-12 text-lime-600">
          History
        </Text>
        <View style={styles.container}>
          {Object.keys(history).length > 0 && (
            <FlatList
              data={Object.keys(history)}
              keyExtractor={(item: string) => item}
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
    padding: 10,
    width: "100%",
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
