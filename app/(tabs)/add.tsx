import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { getData, saveData } from "../../components/Storage";
import { useCallback, useState } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { MONTHS } from "@/constants/Common";

export default function AddScreen() {
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
    const totalAmount = funds + amount;
    await saveData("funds", totalAmount.toString());
    let date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${MONTHS[month]} ${year}`;
    const newHistory = {
      id: uuid.v4(),
      amount,
      type: "CREDIT",
      created_at: date,
    };
    if (key in history) {
      history[key].push(newHistory);
    } else {
      history[key] = [newHistory];
    }
    await saveData("history", JSON.stringify(history));
    setFunds(totalAmount);
    setAmount(0);
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 flex-col items-center px-4 gap-10 bg-slate-300">
        <Text className="text-6xl mt-24">Credit funds</Text>
        <CustomTextInput
          placeholder={isFocused ? "" : "Enter amount"}
          onChange={(val: string) => onAmountChange(val)}
          value={amount === 0 ? "" : amount.toString()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></CustomTextInput>
        <CustomButton title="Credit" handlePress={handlePress}></CustomButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
