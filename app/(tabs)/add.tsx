import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { getData, saveData } from "../../components/Storage";
import { useCallback, useState } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function AddScreen() {
  const [funds, setFunds] = useState(0);
  const [history, setHistory] = useState([] as string[]);
  const [amount, setAmount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchAmount = async () => {
        const amount = await getData("funds");
        const historyData = await getData("history");
        if (amount) {
          setFunds(parseInt(amount));
        }
        if (historyData) {
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
    const newHistory: string = `Added $${amount} on ${new Date().toLocaleString()}`;
    history.push(newHistory);
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
