import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import moment from "moment";

type DataCardProps = {
  data:String
};

const DataCard = ({data}: DataCardProps) => {
  console.log("inside data card",data)
  return (
  <>
    <View style={{borderWidth:0.5, borderColor: "black"}}>
      <Text>{data}</Text>
    </View>
  </>
  );
};

const FollowUp = () => {
  const [showCalender, setShowCalender] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [followUpData, setFollowUpData] = useState<String[]>([]);

  const handleDateChange = (event: DateTimePickerEvent, selected: Date) => {
    if (selected) {
      const formattedDate = moment(selected).format("YYYY-MM-DD");
      console.log("inside the datechangefunction", formattedDate)
      setDate(formattedDate);
      setShowCalender(false);
      setShowClock(true);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selected: Date) => {
    if (selected) {
      const formattedTime = moment(selected).format("HH:mm:ss");
      console.log("inside the timechangefunction", formattedTime)
      setTime(formattedTime);
      setShowCalender(false);
      setShowClock(false);
      saveToScheduleArray();
    }
  };

  const saveToScheduleArray = () => {
    if (date && time) {
      const dateTimeString = `${date} ${time}`;
      setFollowUpData((prevData) => [...prevData, dateTimeString]);
      console.log("inside the save function now", followUpData)
    }
  };


  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 10,
          paddingVertical: 15,
        }}
      >
        {/* Heading */}
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Follow up</Text>
        <TouchableOpacity onPress={() => setShowCalender((p) => !p)}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      {showCalender && (
        <DateTimePicker
          value={new Date()}
          display="calendar"
          mode="date"
          onChange={handleDateChange}
        />
      )}

      {/* TimeClock */}
      {showClock && (
        <DateTimePicker
          value={new Date()}
          display="clock"
          mode="time"
          onChange={handleTimeChange}
        />
      )}
      {followUpData.length !== 0 && (
        followUpData.map((item, i)=>{
          return(
            <DataCard
              key={i}
              data={item}
            />
          )
        })  
      )}
    </>
  );
};

export default FollowUp;

const styles = StyleSheet.create({});
