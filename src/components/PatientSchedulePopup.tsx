import { Platform, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { TimelineEventProps } from "react-native-calendars";
import { Host, Portal } from "react-native-portalize";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import PatientNotesModal from "./PatientNotesModal";
import FollowUp from "./FollowUp";

type Props = {
  showPatientPortal: boolean;
  handleClosePatientPortal: () => void;
  patientData: TimelineEventProps;
  modifyEventTime: (start: string, end: string) => void;
  deleteEvent: (title: string, start: string, end: string) => void;
};

const PatentSchedulePopup = ({
  showPatientPortal,
  handleClosePatientPortal,
  patientData,
  modifyEventTime,
  deleteEvent,
}: Props) => {
  const [changedFromTime, setChangedFromTime] = useState(null);
  const [changedToTime, setChangedToTime] = useState(null);
  const [showFromClock, setShowFromClock] = useState(false);
  const [showToClock, setShowToClock] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  console.log(patientData)
  const handleFromTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date
  ) => {
    setShowFromClock(false);
    if (selectedTime) {
      setChangedFromTime(moment(selectedTime).format("HH:mm:ss"));
    }
  };

  const handleToTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date
  ) => {
    setShowToClock(false);
    if (selectedTime) {
      setChangedToTime(moment(selectedTime).format("HH:mm:ss"));
    }
  };

  const handleSaveButton = () => {
    const modifiedPatientData = {
      ...patientData,
      start:
        moment(patientData.start).format("YYYY-MM-DD") + " " + changedFromTime,
      end: moment(patientData.end).format("YYYY-MM-DD") + " " + changedToTime,
    };

    modifyEventTime(modifiedPatientData.start, modifiedPatientData.end);
    setChangedFromTime(null);
    setChangedToTime(null);
    handleClosePatientPortal();
  };

  const handleDeleteButton = () => {
    deleteEvent(patientData.title, patientData.start, patientData.end);
    setChangedFromTime(null);
    setChangedToTime(null);
    handleClosePatientPortal();
  };

  return (
    <>
      {showPatientPortal && (
        <Portal>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={{ fontSize: 25, fontWeight:"bold" }}>{patientData.title}</Text>
              <Text style={{ fontSize: 17, paddingTop: 20 }}>From: </Text>

              {/* FromSection */}
              <TouchableOpacity
                onPress={() => setShowFromClock((prevState) => !prevState)}
              >
                <Text style={{ marginTop: 10 }}>
                  {changedFromTime ? (
                    <Text>
                      {moment(changedFromTime, "HH:mm:ss").format("hh:mm A")}
                    </Text>
                  ) : (
                    <Text>
                      {moment(new Date(patientData.start)).format("hh:mm A")}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
              {showFromClock && (
                <DateTimePicker
                  value={new Date(patientData.start)}
                  mode="time"
                  display="compact"
                  onChange={handleFromTimeChange}
                />
              )}

              <Text style={{ fontSize: 17, paddingTop: 20 }}>To: </Text>
              <TouchableOpacity
                onPress={() => setShowToClock((prevState) => !prevState)}
              >
                <Text style={{ marginTop: 10 }}>
                  {changedToTime ? (
                    <Text>
                      {moment(changedToTime, "HH:mm:ss").format("hh:mm A")}
                    </Text>
                  ) : (
                    moment(new Date(patientData.end)).format("hh:mm A")
                  )}
                </Text>
              </TouchableOpacity>
              {showToClock && (
                <DateTimePicker
                  value={new Date(patientData.end)}
                  mode="time"
                  display="compact"
                  onChange={handleToTimeChange}
                />
              )}

              {/* Save Button */}
              {(changedFromTime || changedToTime) && (
                <TouchableOpacity
                  onPress={handleSaveButton}
                  style={styles.closeButton}
                >
                  <Text style={{ textAlign: "center" }}>Save</Text>
                </TouchableOpacity>
              )}

              <FollowUp/>
              {/* Notes Button */}
              <TouchableOpacity
                onPress={() => setShowNotesModal(true)}
                style={styles.closeButton}
              >
                <Text style={{ textAlign: "center" }}>Notes</Text>
              </TouchableOpacity>

                {/*Cancel and Delete button section*/}
              <View style={{ flexDirection: "row", gap: 40, alignItems:"center", justifyContent:"center" }}>
                {/* Cancel Button */}
                <TouchableOpacity
                  onPress={handleClosePatientPortal}
                  style={{...styles.closeButton, paddingHorizontal:30}}
                >
                  <Text style={{ textAlign: "center" }}>Close</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={handleDeleteButton}
                  style={{...styles.deleteButton, paddingHorizontal:30}}
                >
                  <Text style={{ textAlign: "center" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <PatientNotesModal
            showNotesModal={showNotesModal}
            patientData={patientData}
            setShowNotesModal={setShowNotesModal}
          />
          
        </Portal>
      )}
    </>
  );
};

export default PatentSchedulePopup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    backgroundColor: "#fff",
    padding: 30,
    paddingHorizontal: 40,
    borderRadius: 8,
    position: "relative",
  },
  dateButton: {
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
    marginTop: 10,
  },
  timeButton: {
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
    marginTop: 10,
  },
  saveButton: {
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
  },
  closeButton: {
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
  },
  deleteButton: {
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 7,
    backgroundColor: "rgba(255, 105, 97, 0.4)",
  },
});
