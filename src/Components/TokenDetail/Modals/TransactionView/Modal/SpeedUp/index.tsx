import { BlurView } from "expo-blur";
import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import PrimaryButton from "../../../../../Buttons/Primary";
interface SpeedUpProps {
    speedModal: boolean;
    setSpeedModal: (speedModal: boolean) => void;
    setModalVisible: (modalVisible: boolean) => void;

}

const SpeedUp: React.FC<SpeedUpProps> = ({ speedModal, setSpeedModal, setModalVisible }) => {
    return (
        <Modal
            visible={speedModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 40 }}>
                            <Text style={styles.modalText}>Attempt to speed up ?</Text>
                            <View style={{ alignItems: "center", gap: 8 }}>
                                <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Gas Cancellation Fee</Text>
                                <Text style={{ fontSize: 18, lineHeight: 28, color: "white", fontFamily: "Poppins_500Medium" }}> {`<0.00001 ETH`}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ textAlign: "center", color: "#ABAFC4", fontSize: 14, lineHeight: 24 }}>If the speed up attempt is successful, you will be charged the transaction fee above.</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable style={{ width: "48%" }} onPress={() => {
                                setSpeedModal(false)
                                setModalVisible(false)
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Cancel</Text>
                            </Pressable>
                            <View style={{ width: "48%" }}>
                                <PrimaryButton
                                    text="Yes, let's try"
                                    onPress={() => setSpeedModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 32
    },

    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 40,
        paddingHorizontal: 24,

    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontFamily: "Poppins_500Medium",
        textAlign: "center",
        paddingTop: 40,
        paddingBottom: 16
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
        backgroundColor: 'rgb(0,0,0,10)',
    }
})
export default SpeedUp