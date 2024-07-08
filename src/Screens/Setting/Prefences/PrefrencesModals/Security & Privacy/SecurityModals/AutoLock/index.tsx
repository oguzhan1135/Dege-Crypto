import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from '@expo/vector-icons';

interface AutoLockProps {
    autoLockModal: boolean;
    setAutoLockModal: (AutoLockModal: boolean) => void;
    onChangeAutoLock: (autoLock: string) => void;

}
const AutoLock: React.FC<AutoLockProps> = ({
    autoLockModal,
    setAutoLockModal,
    onChangeAutoLock
}) => {

    const [times, setTimes] = useState([
        "Immediately",
        "After 5 seconds",
        "After 15 seconds",
        "After 30seconds",
        "After 60 seconds",
        "After 5 minutes",
        "After 10 minutes",
        "Never"
    ])
    const [selectedTime, setSelectedTime] = useState("After 5 minutes")

    return (
        <Modal
            visible={autoLockModal}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Auto-Lock</Text>
                            <Pressable onPress={() => { setAutoLockModal(false) }} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ gap: 16, paddingBottom: 24 }}>

                            {
                                times.map((time, index) =>
                                    <Pressable key={index} onPress={() => {
                                        setSelectedTime(time)
                                        onChangeAutoLock(time)
                                        setAutoLockModal(false)
                                    }} style={styles.listItem}>
                                        <Text style={styles.contentTitle}>{time}</Text>
                                        {
                                            selectedTime === time ?
                                                <AntDesign name="checkcircleo" size={20} color="#76E268" /> : null
                                        }

                                    </Pressable>
                                )
                            }




                        </View>


                    </View>

                </View>

            </BlurView>

        </Modal>
    )
}
const styles = StyleSheet.create({

    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 0,
        paddingHorizontal: 24,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontFamily: "Poppins_500Medium",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 24
    },
    blur: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    contentText: {
        fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#ABAFC4"
    },
    contentTitle: {
        fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white"
    },
    listItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
export default AutoLock;

