import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TextInputType {
  placeholder: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  value: string;
  containerStyles?: string;
  textStyles?: string;
}
const CustomTextInput = ({
  placeholder,
  onChange,
  onFocus,
  onBlur,
  value,
  containerStyles,
  textStyles,
}: TextInputType) => {
  return (
    <View
      className={`flex flex-row items-center space-x-4 w-full h-24 px-2 bg-black-100 rounded-2xl border-2 border-black-200 ${containerStyles}`}
    >
      <TextInput
        className={`mt-0.5 text-black flex-1 justify-center text-center font-pregular text-4xl ${textStyles}`}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType="numeric"
        onChangeText={onChange}
      />
    </View>
  );
};

export default CustomTextInput;
