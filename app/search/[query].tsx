import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { getData } from "@/components/Storage";
import { IconSymbol } from "@/components/ui/IconSymbol";

const Search = () => {
  const [history, setHistory] = useState([] as any);
  const { query } = useLocalSearchParams();

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData: any = await getData("history");
      if (historyData) {
        let data = JSON.parse(historyData);
        setHistory((data[query as string] as any[]).reverse());
      }
    };

    fetchHistory();
  }, []);

  const renderCard = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{`${item.type} $${
          item.amount
        } on ${new Date(item.created_at).toLocaleDateString()}`}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1 flex-col items-center px-4 pb-10 gap-10 bg-slate-300">
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <IconSymbol
            size={28}
            name="chevron.backward.circle.fill"
            color={"black"}
          />
        </Pressable>
        <Text className="text-5xl my-8">{query}</Text>

        {history && (
          <FlatList
            data={history}
            keyExtractor={(item: any) => item.id}
            renderItem={renderCard}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

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
  back: {
    position: "relative",
    top: 10,
    left: 5,
  },
});

export default Search;
