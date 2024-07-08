import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../../../../../Components/Buttons/Primary";
import StepOne from "./RevalModals/StepOne";
import StepTwo from "./RevalModals/StepTwo";

interface RevalSeedProps {
    revalSeedModal: boolean;
    setRevalSeedModal: (revalSeedModal: boolean) => void;
}
const RevalSeed: React.FC<RevalSeedProps> = ({
    revalSeedModal,
    setRevalSeedModal,
}) => {

    const [modalStep, setModalStep] = useState(2)

    const closeModal = () => {

        if (modalStep === 2) {
            setModalStep(1)
            setRevalSeedModal(false);
        }
        console.log(modalStep)
    }
    return (
        <Modal
            visible={revalSeedModal}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 24 }}>
                            <Text style={styles.modalText}>Reveal Seed Phrase</Text>
                            <Pressable onPress={() => { setRevalSeedModal(false) }} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        {
                            modalStep === 1 ?
                                <StepOne /> :
                                <StepTwo />
                        }

                        <View style={{ paddingBottom: 40, paddingTop: 48 }}>
                            <PrimaryButton text={modalStep === 1 ? "Next" : "Done"} onPress={() => { setModalStep(modalStep + 1); closeModal() }} />
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
export default RevalSeed;

