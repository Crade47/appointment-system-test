import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './doctor/HomeScreen';
import ScheduleScreen from './doctor/ScheduleScreen';

const Tab = createBottomTabNavigator();

type Props = {}

const DoctorScreen = (props: Props) => {
  return (
     <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
     >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
    </Tab.Navigator>
 )
}

export default DoctorScreen

const styles = StyleSheet.create({})