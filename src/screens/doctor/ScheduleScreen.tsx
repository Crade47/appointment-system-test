import { StyleSheet, View, Text } from "react-native";
import moment from "moment"
import { Ionicons } from "@expo/vector-icons";
import { Host } from "react-native-portalize";
import groupBy from "lodash/groupBy";
import { useState, useEffect } from "react";
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars";
import {
  timelineEvents,
  getDate,
  marked,
  checkAvailability,
} from "../../../data/events";
import next from "../../../assets/next.png";
import previous from "../../../assets/previous.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../components/Avatar";
import BusyPick from "../../components/BusyPick";
import PatentSchedulePopup from "../../components/PatientSchedulePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UnavailabilitySetPopup from "../../components/UnavailabilitySetPopup";
import { busyAlgorithm } from "../../utils/BusyAlgo";
import PatientNotesModal from "../../components/PatientNotesModal";

const EVENTS: TimelineEventProps[] = timelineEvents;

const ScheduleScreen = () => {
  const [todayDate, setTodayDate] = useState<string>(getDate());
  const [eventsByDate, setEventsByDate] = useState<{
    [key: string]: TimelineEventProps[];
  }>(groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start)));
  const [busyData, setBusyData] = useState(checkAvailability(todayDate));
  const [selectedPatient, setSelectedPatient] = useState<TimelineEventProps>({
    start: "",
    end: "",
    title: "",
  });
  const [showPatientPortal, setShowPatientPortal] = useState<boolean>(false);
  const [showUnavailPopup, setShowUnavailPopup] = useState<boolean>(false);
  const [pickedTime, setPickedTime] = useState<string | null>(null);

  const onDateChanged = (date: string) => {
    // setBusyData([])
    setTodayDate(date);
  };
  useEffect(() => {
    const updateBusyData = () => {
      
      const data = checkAvailability(todayDate);
      setBusyData(data);
    };

    updateBusyData();
  }, [todayDate]);

  //Getting Data from storage
  // useEffect(() => {
  //   const sortBusyData = () => {
  //     const sortedData = busyData.sort((a, b) => a.start - b.start);
  //     setBusyData(sortedData);
  //   };

  //   sortBusyData();
  // }, [busyData]);

  //Setting Data inside storage
  // useEffect(() => {
  //   const storeDataToStorage = async () => {
  //     try {
  //       await AsyncStorage.setItem("busyData", JSON.stringify(busyData));
  //       await AsyncStorage.setItem("marked", JSON.stringify(marked));
  //       await AsyncStorage.setItem(
  //         "timelineEvents",
  //         JSON.stringify(eventsByDate)
  //       );
  //     } catch (error) {
  //       console.log("Error storing data to AsyncStorage:", error);
  //     }
  //   };

  //   storeDataToStorage();
  // }, [busyData, marked, eventsByDate]);

  // useEffect(() => {
  //   const updateBusyData = () =>{
  //     setBusyData(checkAvailability(todayDate));
  //     busyAlgorithm(eventsByDate[todayDate], busyData, todayDate);
  //   }
  //   updateBusyData(); 
  // }, [todayDate, eventsByDate]);


  const handleDeleteSlot = (start: number, end: number) => {
    const busySlots = checkAvailability(todayDate);

    const updatedBusySlots = busySlots.filter(
      (slot) => slot.start !== start && slot.end !== end
    );

    setBusyData(updatedBusySlots);
  };

  const renderItem = ({ title, start, end }) => {
    const logo = title.split("")[0];
    const startTime = start.split(" ")[1].slice(0, -3);
    const endTime = end.split(" ")[1].slice(0, -3);
    return (
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 290,
            paddingRight: 15,
          }}
        >
          <Avatar label={logo} />
          <View style={{ flexDirection: "column", rowGap: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{title}</Text>
            <Text style={{ fontWeight: "500", fontSize: 13 }}>
              {startTime} - {endTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleEventCardClick = (data: TimelineEventProps) => {
    setSelectedPatient((prevObj) => ({
      ...prevObj,
      start: data.start,
      end: data.end,
      title: data.title,
    }));
    setShowPatientPortal(true);
  };

  const handleClosePatientPortal = () => {
    setShowPatientPortal(false);
  };

  const handleBackgroundLongPress = (timeString: string) => {
    setPickedTime(timeString);
    setShowUnavailPopup(true);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onBackgroundLongPress: (e) => handleBackgroundLongPress(e),
    onEventPress: (e) => handleEventCardClick(e),
    renderEvent: renderItem,
    unavailableHours: busyData,
    unavailableHoursColor: "rgba(255, 105, 97, 0.4)",
    styles: {
      backgroundColor: "#000000",
      event: {
        backgroundColor: "#000000",
        height: 30,
        borderRadius: 15,
        paddingLeft: 10,
      },
    },
    rightEdgeSpacing: 12,
    scrollToNow: true,
  };

  const addBusySlot = (start: number, end: number) => {
    const newSlot = { start, end };
    setBusyData((prevBusyData) => [...prevBusyData, newSlot]);
  };

  const modifyEventTime = (start: string, end: string) => {
    const updatedEvents = { ...eventsByDate };
    const selectedDate = CalendarUtils.getCalendarDateString(
      selectedPatient.start
    );

    if (updatedEvents[selectedDate]) {
      updatedEvents[selectedDate] = updatedEvents[selectedDate].map((event) => {
        if (
          event.start === selectedPatient.start &&
          event.end === selectedPatient.end
        ) {
          return {
            ...event,
            start,
            end,
          };
        }
        return event;
      });
      console.log(updatedEvents);
      setEventsByDate(updatedEvents);
    }
  };

  const deleteEvent = (title: string, start: string, end: string) => {
    const updatedEvents = { ...eventsByDate };
    const selectedDate = CalendarUtils.getCalendarDateString(start);

    if (updatedEvents[selectedDate]) {
      updatedEvents[selectedDate] = updatedEvents[selectedDate].filter(
        (event) => {
          return !(
            event.title === title &&
            event.start === start &&
            event.end === end
          );
        }
      );

      setEventsByDate(updatedEvents);
    }
  };

  return (
    <>
    <Host>
      <View style={{ flex: 1 }}>
        <BusyPick
          busyData={busyData}
          handleDeleteSlot={handleDeleteSlot}
          addBusySlot={addBusySlot}
        />
        <CalendarProvider
          date={todayDate}
          onDateChanged={onDateChanged}
          showTodayButton
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            firstDay={1}
            leftArrowImageSource={previous}
            rightArrowImageSource={next}
            markedDates={marked}
          />

          <TimelineList
            events={eventsByDate}
            timelineProps={timelineProps}
            showNowIndicator
            scrollToNow
            // scrollToFirst
          />
        </CalendarProvider>
      </View>
      <PatentSchedulePopup
        deleteEvent={deleteEvent}
        modifyEventTime={modifyEventTime}
        handleClosePatientPortal={handleClosePatientPortal}
        patientData={selectedPatient}
        showPatientPortal={showPatientPortal}
      />
      <UnavailabilitySetPopup
        showModal={showUnavailPopup}
        handleCloseModal={() => {
          setPickedTime(null);
          setShowUnavailPopup(false);
        }}
        addBusySlot={addBusySlot}
        pickedTime={pickedTime}
      />

    </Host>

</>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  agendaContainer: {
    backgroundColor: "black",
  },
});
