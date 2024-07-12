import React, { FC, useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, Modal, TouchableOpacity } from "react-native";
import SafeandConvenient from '../../../../../assets/images/SafeandConvenient.svg'
import { useAppNavigation } from "../../../../Router/useAppNavigation";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";
import PrimaryButton from "../../../../Components/Buttons/Primary";

interface SecureProp {
    onChangeStep: (step: number) => void;
}

const SecureWallet: FC<SecureProp> = ({ onChangeStep }) => {
    const navigation = useAppNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [skipCheck, setSkipCheck] = useState(false);
    const [step, setStep] = useState(1);
    const [modalStep, setModalStep] = useState(1)
    const font = "Poppins_500Medium"

    return (
        <View style={styles.container}>
            <SafeandConvenient />
            <Text style={{ fontSize: 16, fontFamily: font, lineHeight: 24, fontWeight: "bold", color: "white" }}>Secure Your Wallet</Text>
            <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "#ABAFC4" }}>Don't risk losing your funds. protect your wallet by saving your
                    <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 20, color: "#5F97FF" }} > Seed phrase</Text> in a place you trust.</Text>
                <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, fontWeight: "bold", color: "#ABAFC4" }}>It's the only way to recover your wallet if you get locked out of the app or get a new device.</Text>
            </View>
            <Pressable onPress={() => setModalVisible(true)}>
                <Text style={{ fontSize: 16, fontFamily: font, lineHeight: 24, fontWeight: "bold", color: "#FEBF32" }}>Remind Me Later</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalOverlay} />
                </TouchableOpacity>
                {
                    modalStep === 1 ?
                        <>
                            <Modal
                                style={styles.blur}
                                visible={modalVisible}
                                animationType="slide"
                                transparent={true}
                            >
                                <BlurView intensity={80} style={{ flex: 1 }}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.modalText}>Skip Account Security?</Text>

                                            <View style={styles.checkContainer}>
                                                <Checkbox
                                                    value={skipCheck}
                                                    onValueChange={() => setSkipCheck(!skipCheck)}
                                                    color="#FEBF32"
                                                />
                                                <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>I understand that if I lose my seed phrase I will not be able to access my wallet
                                                </Text>
                                            </View>
                                            <View style={styles.buttonContainer}>
                                                <Pressable onPress={() => {
                                                    setModalVisible(false);
                                                    setStep(step + 1)
                                                    onChangeStep(step + 1.5)
                                                }}>
                                                    <Text style={{ fontSize: 16, fontFamily: font, lineHeight: 24, fontWeight: "bold", color: "#FEBF32", paddingHorizontal: 30 }}>Secure Now</Text>
                                                </Pressable>
                                                <View style={{ width: "48%" }}>
                                                    <PrimaryButton text="Skip" onPress={() => setModalStep(modalStep + 1)} disabled={!skipCheck} />

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </BlurView>
                            </Modal>
                        </> : modalStep === 2 ?
                            <>
                                <Modal
                                    style={styles.blur}
                                    visible={modalVisible}
                                    animationType="slide"
                                    transparent={true}
                                >
                                    <BlurView intensity={80} style={{ flex: 1 }}>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>
                                                <Text style={styles.modalText}>What is a 'Seed phrase'</Text>
                                                <View style={{ gap: 24, alignItems: "center" }}>
                                                    <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>
                                                        A seed phrase is a set of twelve words that contains all the information about your wallet, including your funds. It's like a secret code used to access your entire wallet.
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>You must keep your seed phrase secret and safe. If someone gets your seed phrase, they'll gain control over your accounts.</Text>
                                                    <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>
                                                        Save it in a place where only you can access it. If you lose it, not even MetaMask can help you recover it.                                                    </Text>
                                                </View>
                                                <PrimaryButton text="I Got It" onPress={() => setModalStep(modalStep + 1)} />


                                            </View>

                                        </View>
                                    </BlurView>
                                </Modal>
                            </> : modalStep === 3 ?
                                <>
                                    <Modal
                                        style={styles.blur}
                                        visible={modalVisible}
                                        animationType="slide"
                                        transparent={true}
                                    >
                                        <BlurView intensity={80} style={{ flex: 1 }}>
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <Text style={styles.modalText}>Protect Your Wallet</Text>
                                                    <View style={{ gap: 24, alignItems: "center" }}>
                                                        <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>
                                                            Dont’t risk losing your funds. Protect
                                                            your wallet by saving your seed phrase in a place you trust.</Text>
                                                        <Text style={{ fontSize: 14, fontFamily: font, lineHeight: 24, color: "white" }}>It’s the only way to recover your wallet if you get locked out of the app or get a new device.</Text>

                                                    </View>
                                                    <PrimaryButton text="I Got It" page="Homescreen" />


                                                </View>

                                            </View>
                                        </BlurView>
                                    </Modal>
                                </> : null
                }

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        alignItems: "center"
    },

    checkContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        paddingRight: 24,
        paddingLeft: 24
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 40
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0,10)'
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
        width: "100%",
        backgroundColor: "#17171A",
        gap: 45,
        paddingBottom: 40,
        paddingHorizontal: 24
    },
    button: {
        width: "48%",
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "bold",
        color: "black"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 16
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
