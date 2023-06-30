import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import CustomerScreen from "./src/screens/CustomerScreen";
import DoctorScreen from "./src/screens/DoctorScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Doctor"
          screenOptions={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
          }}
        >
          <Drawer.Screen name="Customer" component={CustomerScreen} />
          <Drawer.Screen name="Doctor" component={DoctorScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
