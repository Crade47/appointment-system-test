import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  label: string;
  size?: number;
};

const Avatar = ({ label, size }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "lavender",
        borderRadius: 100,
        padding: 25,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{label}</Text>
      </View>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
