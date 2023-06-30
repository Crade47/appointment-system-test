import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './customer/HomeScreen';
import ScheduleScreen from './customer/ScheduleScreen';
import ExploreScreen from './customer/ExploreScreen';

const Tab = createBottomTabNavigator();

type Props = {}

const CustomerScreen = (props: Props) => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  )
}

export default CustomerScreen

const styles = StyleSheet.create({})