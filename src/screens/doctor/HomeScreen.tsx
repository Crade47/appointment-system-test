import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Portal, Text } from 'react-native-paper';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View>
      <Text>Hello this is homepage</Text>
    </View>
    // <Portal>
    //   <Text>This is rendered at a different place</Text>
    // </Portal>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
