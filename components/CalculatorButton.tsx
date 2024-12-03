import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";

import * as Haptics from 'expo-haptics';

interface Props {
  label: string;
  color?: string;
  textBlack?: boolean;
  doubleSize?: boolean;
  onPress: ()=>void;
}

const CalculatorButton = ({ 
  label = 'X', 
  color = Colors.darkGray, 
  textBlack = false, 
  doubleSize = false, 
  onPress 
} : Props) => {
  return (
    <Pressable 
    onPress={()=>{
      Haptics.selectionAsync()
      onPress()
    }}
    style={({pressed})=>({
      ...globalStyles.button,
      backgroundColor: color,
      opacity: pressed ? 0.8 : 1,
      width: doubleSize ? 180 : 80
    })}
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
