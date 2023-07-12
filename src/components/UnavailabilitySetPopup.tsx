import { Platform, StyleSheet, Text, View } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { Portal } from "react-native-portalize";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

type Props = {
  showModal: boolean;
  handleCloseModal: () => void;
  addBusySlot: (start: number, end: number) => void;
  pickedTime?: string | null;
};

const UnavailabilitySetPopup = ({
  showModal,
  pickedTime,
  handleCloseModal,
  addBusySlot,
}: Props) => {
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [showFromClock, setShowFromClock] = useState(false);
  const [showToClock, setShowToClock] = useState(false);

  const handleFromTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date
  ) => {
    setShowFromClock(false);
    if (selectedTime) {
      setFromTime(moment(selectedTime).format("hh:mm A"));
    }
  };

  const handleToTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date
  ) => {
    setShowToClock(false);
    if (selectedTime) {
      setToTime(moment(selectedTime).format("hh:mm A"));
    }
  };

  const handleSaveClick = () => {
    const start = parseFloat(moment(fromTime, "hh:mm A").format("HH.mm"));
    const end = parseFloat(moment(toTime, "hh:mm A").format("HH.mm"));
    addBusySlot(start, end);
    console.log(`Start time is ${start}, End time is ${end}`);
    setFromTime(null);
    setToTime(null);
    handleCloseModal();
  };

  const handleCloseButton = () => {
    setFromTime(null);
    setToTime(null);
    handleCloseModal();
  };

  useEffect(() => {
    const setFromFunc = () => {
      if (pickedTime) {
        const formattedFrom = moment(
          pickedTime.split(" ")[1],
          "HH:mm:ss"
        ).format("hh:mm A");

        setFromTime(formattedFrom);
      }
    };

    setFromFunc();
  }, [pickedTime]);

  return (
    <>
      {showModal && (
        <Portal>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={{ fontSize: 20 }}>Pick a time slot</Text>

              {/* From time  */}
              <TouchableOpacity
                onPress={() => setShowFromClock(p => !p)}
                style={styles.timeButton}
              >
                <Text style={{ textAlign: "center" }}>
                  {fromTime
                    ? `From: ${fromTime}`
                    : pickedTime
                    ? moment(pickedTime.split(" ")[1], "HH:mm:ss").format(
                        "hh:mm A"
                      )
                    : "Select From Time"}
                </Text>
              </TouchableOpacity>
              

              {/* From Clock */}
              {showFromClock && (
                <DateTimePicker
                  value={pickedTime ? new Date(pickedTime) : new Date()}
                  mode="time"
                  display="compact"
                  onChange={handleFromTimeChange}
                  onTouchCancel={() => console.log("cancelled")}
                />
              )}


                {/* To Time */}
              {(fromTime || pickedTime) && (
                <TouchableOpacity
                  onPress={() => setShowToClock(p => !p)}
                  style={styles.timeButton}
                >
                  <Text style={{ textAlign: "center" }}>
                    {toTime ? `To: ${toTime}` : "Select To Time"}
                  </Text>
                </TouchableOpacity>
              )}


              {/* To Clock */}
              {showToClock && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="compact"
                  onChange={handleToTimeChange}
                />
              )}


              {/*Add Button*/}
              {toTime && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleSaveClick}
                >
                  <Text style={{ textAlign: "center" }}>Add</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleCloseButton}
                style={styles.closeButton}
              >
                <Text style={{ textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Portal>
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
