import { StyleSheet, SafeAreaView, Text } from "react-native";
import { getData } from "../../components/Storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [funds, setFunds] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const fetchAmount = async () => {
        //await removeData("funds");
        const amount = await getData("funds");
        if (amount) {
          setFunds(parseInt(amount));
        }
      };

      fetchAmount();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 flex-col items-center bg-slate-300">
      <Text className="text-6xl mt-24 text-center">Remaining funds</Text>
      <Text className="text-8xl mt-16">${funds}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
