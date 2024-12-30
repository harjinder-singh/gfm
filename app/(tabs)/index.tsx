import { Text, View } from "react-native";
import { getData, removeData } from "../../components/Storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MONTHS } from "@/constants/Common";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [funds, setFunds] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [limit, setLimit] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const fetchAmount = async () => {
        const amount = await getData("funds");
        const historyData: any = await getData("history");
        if (amount) {
          setFunds(parseInt(amount));
        }
        const date = new Date();
        const month: number = date.getMonth();
        const year = date.getFullYear();

        if (historyData) {
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
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const todaysDate = date.getDate();
        const daysRemaining = daysInMonth - (todaysDate - 1);
        if (amount) {
          setLimit(Math.floor(parseInt(amount) / daysRemaining));
        } else {
          setLimit(0);
        }
      };

      fetchAmount();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 flex-col gap-6 items-center bg-slate-300">
      <Text className="text-5xl mt-12 text-center text-lime-600">
        Funds Manager
      </Text>
      <View className="d-flex flex-col gap-6">
        <View className="d-flex flex-col gap-4 bg-white shadow-md rounded-2xl overflow-hidden p-8">
          <Text className="text-4xl text-center text-lime-600">
            Remaining Funds
          </Text>
          <Text className="text-4xl text-center">${funds}</Text>
        </View>
        <View className="d-flex flex-col gap-4 bg-white shadow-md rounded-2xl overflow-hidden p-8">
          <Text className="text-4xl text-center text-lime-600">
            Monthly Stats
          </Text>
          <View className="d-flex flex-row justify-between">
            <View className="d-flex flex-col gap-4">
              <Text className="text-4xl text-center">Credit</Text>
              <Text className="text-4xl text-center">${credit}</Text>
            </View>
            <View className="d-flex flex-col gap-4">
              <Text className="text-4xl text-center">Debit</Text>
              <Text className="text-4xl text-center">${debit}</Text>
            </View>
          </View>
        </View>
        <View className="d-flex flex-col gap-4 bg-white shadow-md rounded-2xl overflow-hidden p-8">
          <Text className="text-4xl text-center text-lime-600">
            Per Day Limit
          </Text>
          <Text className="text-4xl text-center">${limit}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
