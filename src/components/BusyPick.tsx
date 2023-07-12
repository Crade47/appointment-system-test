import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { BusyDataType } from "../../data/events";
import TimeslotCard from "./TimeslotCard";
import UnavailabilitySetPopup from "./UnavailabilitySetPopup";

type Props = {
  busyData: BusyDataType;
  handleDeleteSlot: (start: number, end: number) => void;
  addBusySlot: (start: number, end: number) => void
};

const BusyPick = ({
  busyData,
  handleDeleteSlot,
  addBusySlot
}: Props) => {
  const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(prevState => !prevState)

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingTop: 70,
        paddingLeft: 63,
        paddingBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10 }}>
        <Text style={{ fontSize: 25 }}>Busy Slots</Text>

        <TouchableOpacity
          onPress={() => setShowModal((prevState) => !prevState)}
        >
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
        <UnavailabilitySetPopup showModal={showModal} handleCloseModal={handleCloseModal} addBusySlot={addBusySlot}/>
      </View>

      <View style={{ marginTop: 10 }}>
        <FlashList
          data={busyData}
          renderItem={({ item, index }) => (
            <>
              <TimeslotCard
                key={index}
                start={item.start}
                end={item.end}
                handleDeleteSlot={handleDeleteSlot}
              />
            </>
          )}
          estimatedItemSize={51}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default BusyPick;

const styles = StyleSheet.create({});
