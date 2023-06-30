import { Platform, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Portal } from "react-native-portalize";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

type Props = {
  showModal: boolean;
  handleCloseModal: () => void;
  addBusySlot: (start: number, end: number) => void;
};

const UnavailabilitySetPopup = ({ showModal, handleCloseModal, addBusySlot }: Props) => {
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (event, selected) => {
    setShowDateTimePicker(false);
    if (selected) {
      const formattedTime = moment(selected).format("hh:mm A");
      if (!fromTime) {
        setFromTime(formattedTime);
      } else {
        setToTime(formattedTime);
      }
      setSelectedTime(selected);
    }
  };

  const handleTimeButtonPress = () => {
    setShowDateTimePicker(true);
  };

  const handleSaveClick = () =>{
    const start = parseInt(moment(fromTime, "hh:mm A").format("HH.mm"))
    const end = parseInt(moment(toTime, "hh:mm A").format("HH.mm"))
    addBusySlot(start, end)
    setFromTime(null);
    setToTime(null);
    handleCloseModal(); 
  }

  return (
    <>
      {showModal && (
        <Portal>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={{ fontSize: 20 }}>Pick a time slot</Text>
              <TouchableOpacity
                onPress={handleTimeButtonPress}
                style={styles.timeButton}
              >
                <Text style={{ textAlign: "center" }}>
                  {fromTime ? `From: ${fromTime}` : "Select From Time"}
                </Text>
              </TouchableOpacity>

              {fromTime && (
                <TouchableOpacity
                  onPress={handleTimeButtonPress}
                  style={styles.timeButton}
                >
                  <Text style={{ textAlign: "center" }}>
                    {toTime ? `To: ${toTime}` : "Select To Time"}
                  </Text>
                </TouchableOpacity>
              )}
              {toTime && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleSaveClick}
                >
                  <Text style={{ textAlign: "center" }}>Add</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Text style={{ textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Portal>
      )}
      {showDateTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="compact"
          onChange={handleTimeChange}
        />
      )}
    </>
  );
};

export default UnavailabilitySetPopup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 8,
    position: "relative",
  },
  timeButton: {
    borderWidth: 0.5,
    justifyContent: "space-between",
    borderRadius: 7,
    padding: 7,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
  },
});
