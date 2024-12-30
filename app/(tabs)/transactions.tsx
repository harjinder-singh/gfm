import { SafeAreaView } from "react-native-safe-area-context";
import AddTransaction from "@/components/Transactions/add";
import RemoveTransaction from "@/components/Transactions/remove";

export default function TransactionsScreen() {
  return (
    <SafeAreaView className="flex-1 flex-col items-center bg-slate-300 p-4">
      <AddTransaction></AddTransaction>
      <RemoveTransaction></RemoveTransaction>
    </SafeAreaView>
  );
}
