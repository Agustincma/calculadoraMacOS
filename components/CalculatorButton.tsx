import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";

interface Props {
  label: string;
  color?: string;
  textBlack?: boolean;
  onPress: ()=>void;
}

const CalculatorButton = ({ 
  label = 'X', 
  color = Colors.textPrimary, 
  textBlack = false, 
  onPress 
} : Props) => {
  return (
    <Pressable 
    onPress={onPress}
    style={globalStyles.button}
    >
      <Text style={{
        ...globalStyles.buttonText,
        color: textBlack ? 'black' : 'white'
      }}
      >{label}</Text>
    </Pressable>
  );
};

export default CalculatorButton;
