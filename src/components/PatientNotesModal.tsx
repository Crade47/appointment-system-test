import {
  StyleSheet,
  Modal,
  Image,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { TimelineEventProps } from "react-native-calendars";
import moment from "moment";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { patientNotes } from "../../data/events";
import * as ImagePicker from "expo-image-picker";

type Props = {
  showNotesModal: boolean;
  setShowNotesModal: React.Dispatch<boolean>;
  patientData: TimelineEventProps;
};

const PatientNotesModal = ({
  showNotesModal,
  setShowNotesModal,
  patientData,
}: Props) => {
  const richText = useRef();
  const [image, setImage] = useState(null);

  const initialContent = patientNotes[patientData.start]
    ? patientNotes[patientData.start]
    : "";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <View>
        {/* MainModal */}
        <Modal
          animationType="slide"
          visible={showNotesModal}
          onRequestClose={() => {
            setShowNotesModal(!showNotesModal);
          }}
        >
          {/* Header */}
          <View style={{ padding: 20 }}>
            {/* Patient Name */}
            <Text style={{ fontSize: 25, fontWeight: "600" }}>
              {patientData.title}'s Session
            </Text>
            {/* Date of session */}
            <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: "600" }}>
              {moment(patientData.start.slice(0, 10)).format(
                "Do [of] MMMM YYYY"
              )}
            </Text>
            {/* Time of meeting */}
            <Text style={{ paddingTop: 5, fontSize: 13, fontWeight: "400" }}>
              {patientData.start.slice(10, -3)} -{" "}
              {patientData.end.slice(10, -3)}
            </Text>
          </View>

          {/* Editor Toolbar*/}

          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertImage,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            selectedIconTint="#A7C7E7"
            onPressAddImage={() => pickImage()}
          />
          <ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View style={{ padding: 20 }}>
                {/* Actual Editor */}

                <RichEditor
                  ref={richText}
                  onChange={(descriptionText) => {
                    console.log("descriptionText:", descriptionText);
                  }}
                  placeholder="Type your text here..."
                  initialContentHTML={initialContent}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </Modal>
      </View>
    </>
  );
};

export default PatientNotesModal;

const styles = StyleSheet.create({});
