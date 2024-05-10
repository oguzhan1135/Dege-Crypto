import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import SafeandConvenient from '../../../../../assets/images/SafeandConvenient.svg'
import { useAppNavigation } from "../../../../Router/useAppNavigation";
import { BlurView } from "@react-native-community/blur";

const SecureWallet = () => {
    const navigation = useAppNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <SafeandConvenient />
            <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "bold", color: "white" }}>Secure Your Wallet</Text>
            <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, lineHeight: 24, color: "#ABAFC4" }}>Don't risk losing your funds. protect your wallet by saving your
                    <Text style={{ fontSize: 14, lineHeight: 20, color: "#5F97FF" }} > Seed phrase</Text> in a place you trust.</Text>
                <Text style={{ fontSize: 14, lineHeight: 24, fontWeight: "bold", color: "#ABAFC4" }}>It's the only way to recover your wallet if you get locked out of the app or get a new device.</Text>
            </View>
            <Pressable onPress={() => setModalVisible(true)}>
                <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "bold", color: "#FEBF32" }}>Remind Me Later</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <BlurView
                    style={styles.blur}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Reminder</Text>
                            <Text style={styles.modalText}>Don't forget to secure your wallet!</Text>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#FEBF32" }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 40
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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
});

export default SecureWallet;
