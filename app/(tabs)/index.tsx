import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { getData, removeData } from "../../components/Storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MONTHS } from "@/constants/Common";

export default function HomeScreen() {
  const [funds, setFunds] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const fetchAmount = async () => {
        const amount = await getData("funds");
        const historyData: any = await getData("history");
        if (amount) {
          setFunds(parseInt(amount));
        }
        if (historyData) {
          const date = new Date();
          const month: number = date.getMonth();
          const year = date.getFullYear();
          const key: string = `${MONTHS[month]} ${year}`;
          const monthlyRecord = JSON.parse(historyData)[key];
          let creditSum = 0;
          let debitSum = 0;
          monthlyRecord.forEach((transaction: any) => {
            if (transaction.type === "CREDIT") {
              creditSum += transaction.amount;
            }
            if (transaction.type === "DEBIT") {
              debitSum += transaction.amount;
            }
          });
          setDebit(debitSum);
          setCredit(creditSum);
        }
      };

      fetchAmount();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 flex-col items-center bg-slate-300">
      <View className="p-6 mt-4">
        <View className="mt-12">
          <Text className="text-7xl text-center text-lime-600">
            Remaining Funds
          </Text>
          <Text className="text-7xl mt-8 text-center">${funds}</Text>
        </View>
        <View className="mt-12">
          <Text className="text-7xl text-center text-lime-600">
            Monthly Stats
          </Text>
          <View className="d-flex flex-row gap-12 justify-center">
            <View className="mt-8">
              <Text className="text-6xl text-center">Credit</Text>
              <Text className="text-7xl mt-8 text-center">${credit}</Text>
            </View>
            <View className="mt-8">
              <Text className="text-6xl text-center">Debit</Text>
              <Text className="text-7xl mt-8 text-center">${debit}</Text>
            </View>
          </View>
        </View>
      </View>
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
