import AsyncStorage from '@react-native-async-storage/async-storage';

// Check if busyData exists in AsyncStorage
export const getBusyDataFromStorage = async () => {
  try {
    const busyData = await AsyncStorage.getItem('busyData');
    return busyData ? JSON.parse(busyData) : null;
  } catch (error) {
    console.log('Error retrieving busyData from AsyncStorage:', error);
    return null;
  }
};

// Check if marked exists in AsyncStorage
export const getMarkedFromStorage = async () => {
  try {
    const markedData = await AsyncStorage.getItem('marked');
    return markedData ? JSON.parse(markedData) : null;
  } catch (error) {
    console.log('Error retrieving marked from AsyncStorage:', error);
    return null;
  }
};

// Check if eventsByDate exists in AsyncStorage
export const getEventsByDateFromStorage = async () => {
  try {
    const timelineEventsData= await AsyncStorage.getItem('timelineEvents');
    return timelineEventsData ? JSON.parse(timelineEventsData) : null;
  } catch (error) {
    console.log('Error retrieving eventsByDate from AsyncStorage:', error);
    return null;
  }
};
