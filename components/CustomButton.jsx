import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] min-w-[240px] flex flex-row justify-center items-center p-5 bg-lime-600 ${containerStyles}`}
    >
      <Text className={`text-primary text-4xl text-lime-50 ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
