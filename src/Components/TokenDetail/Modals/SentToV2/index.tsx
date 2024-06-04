import { BlurView } from "expo-blur";
import React from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import Account from "../../Account";
import { Accounts, Recent } from "../../../../Router/types";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";

interface SenToProps {
    setSentModalVisible: (modalVisible: boolean) => void;
    sentModalVisible: boolean;
    currency: string;
    paymentTo?: Recent;
    recent: Recent[];
    modalStep: number;
    setModalStep: (modalstep: number) => void;
    onchangeAccount: (account: Accounts) => void;
}

const SentToV2: React.FC<SenToProps> = (
    {
        sentModalVisible,
        setModalStep,
        setSentModalVisible,
        paymentTo,
        currency,
        modalStep,
        onchangeAccount

    }) => {

    return (
        <Modal
            style={styles.blur}
            visible={sentModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 32 }}>
                            <Text style={styles.modalText}>Sent To</Text>
                            <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ gap: 8 }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>From</Text>
                                <Account currency={currency} onChangeAccount={onchangeAccount} />
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>To</Text>

                            </View>
                        </View>
                        <View style={{ paddingBottom: 350 }}>
                            <View style={{ alignItems: "center", flexDirection: "row", gap: 8, padding: 16 }}>
                                <View style={styles.iconContainer}>
                                    {paymentTo?.avatar}
                                </View>
                                <View style={{ gap: 4 }}>
                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                        {paymentTo?.name}
                                    </Text>
                                    <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>
                                        {paymentTo?.adress}
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <PrimaryButton text='Next' onPress={() => setModalStep(modalStep + 1)} />

                    </View>
                </View>
            </BlurView>
        </Modal>
    )

}
const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: "#222531",
        overflow: "hidden",
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

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
        backgroundColor: 'rgb(0,0,0,10)',
    }
})
export default SentToV2