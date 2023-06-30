import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BusyDataType } from "../../data/events";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = { 
    start: number; 
    end: number;
    handleDeleteSlot: (start: number, end: number) => void
};

const TimeslotCard = ({ start, end, handleDeleteSlot }: Props) => {
  return (
    <TouchableOpacity onLongPress={() => handleDeleteSlot(start,end)}>
      <View
        style={{
          padding: 7,
          paddingRight: 10,
          paddingLeft: 10,
          borderRadius: 10,
          borderColor: "black",
          borderWidth: 0.5,
          marginRight: 10,
        }}
      >
        <Text>
          {start} - {end}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeslotCard;
