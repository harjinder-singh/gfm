import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getData, saveData } from "@/components/Storage";
import { router } from "expo-router";
import uuid from "react-native-uuid";
import { MONTHS } from "@/constants/Common";

export default function RemoveScreen() {
  const [funds, setFunds] = useState(0);
  const [history, setHistory] = useState({} as any);
  const [amount, setAmount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchAmount = async () => {
        const amount = await getData("funds");
        const historyData: any = await getData("history");
        if (amount) {
          setFunds(parseInt(amount));
        }
        if (Object.keys(historyData).length > 0) {
          setHistory(JSON.parse(historyData));
        }
      };

      fetchAmount();
    }, [])
  );

  const onAmountChange = (val: string) => {
    val && parseInt(val) > 0 ? setAmount(parseInt(val)) : setAmount(0);
  };

  const handlePress = async () => {
    if (amount > funds) {
      alert("Cannot debit amount greater than funds available");
      setAmount(0);
      return;
    }
    if (amount <= 0) {
      alert("Please enter valid amount to debit");
      setAmount(0);
      return;
    }
    const newAmount = funds - amount;
    await saveData("funds", newAmount.toString());
    let date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${MONTHS[month]} ${year}`;
    const newHistory = {
      id: uuid.v4(),
      amount,
      type: "DEBIT",
      created_at: date,
    };
    if (key in history) {
      history[key].push(newHistory);
    } else {
      history[key] = [newHistory];
    }
    await saveData("history", JSON.stringify(history));
    setFunds(newAmount);
    setAmount(0);
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 flex-col items-center bg-slate-300 px-4">
        <View className="mt-12 bg-white shadow-md rounded-2xl overflow-hidden gap-8 p-12">
          <Text className="text-5xl text-center text-lime-600">
            Debit funds
          </Text>
          <CustomTextInput
            placeholder={isFocused ? "" : "Enter amount"}
            onChange={(val: string) => onAmountChange(val)}
            value={amount === 0 ? "" : amount.toString()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></CustomTextInput>
          <CustomButton title="Debit" handlePress={handlePress}></CustomButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
