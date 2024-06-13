import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { Transaction } from "../../../../Router/types";
import PrimaryButton from "../../../Buttons/Primary";
import CancelAtempt from "./Modal/CancelAttempt";
import SpeedUp from "./Modal/SpeedUp";

interface TransactionProp {
    setModalVisible: (modalVisible: boolean) => void;
    modalVisible: boolean;
    currency: string;
    selectedTransaction?: Transaction;
    rate: number;
    fee?: number
}

const TransactionView: React.FC<TransactionProp> = ({ setModalVisible, modalVisible, currency, selectedTransaction, rate, fee }) => {

    const [cancelModal, setCancelModal] = useState(false);
    const [speedModal, setSpeedModal] = useState(false);
    return (
        <Modal
            style={styles.blur}
            visible={modalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Recived {currency}</Text>
                        <View style={{ gap: 2, paddingVertical: 16 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Status</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Date</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                {
                                    selectedTransaction?.status === "Confirmed" ?
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                                        : selectedTransaction?.status === "Cancelled" ?
                                            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#EA3943" }}>Cancelled</Text>
                                            : selectedTransaction?.status === "Submitted" ?
                                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#FEBF32" }}>Submitted</Text>
                                                : null


                                }
                                <Text style={{ color: "white", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>{selectedTransaction?.date}</Text>
                            </View>
                        </View>
                        <View style={{ gap: 2, paddingVertical: 16 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>From</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>To</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>0x3Dc6...DfCE</Text>
                                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>0x3Dc6...DfF9</Text>
                            </View>
                        </View>
                        <View style={{ gap: 2, paddingVertical: 16 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Nonce</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>#0</Text>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 16, gap: 8, borderRadius: 8, borderWidth: 1, borderColor: "#242424" }}>
                            {
                                selectedTransaction?.type === "Sent" &&
                                <View style={{ gap: 16 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{selectedTransaction.amount} {currency}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 2, paddingHorizontal: 16, paddingBottom: 16, borderBottomColor: "#242424" }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Network fee</Text>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{fee} {currency}</Text>
                                    </View>
                                </View>
                            }
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                {selectedTransaction &&
                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                        {selectedTransaction.type === "Sent"
                                            ? `${(selectedTransaction.amount + fee).toFixed(5)} ${currency}`
                                            : `${selectedTransaction.amount.toFixed(5)} ${currency}`}
                                    </Text>
                                }
                            </View>
                            {selectedTransaction &&
                                <Text style={{ marginLeft: "auto", color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", paddingHorizontal: 16 }}>
                                    ${selectedTransaction.type === "Sent"
                                        ? ((selectedTransaction.amount + fee) * rate).toFixed(5)
                                        : (selectedTransaction.amount * rate).toFixed(5)}
                                </Text>
                            }
                        </View>

                        {
                            fee === 0.08 ?
                                <View style={styles.buttonContainer}>
                                    <Pressable onPress={() => setCancelModal(true)} style={{ width: "48%" }}>
                                        <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Cancel</Text>
                                    </Pressable>
                                    <View style={{ width: "48%" }}>
                                        <PrimaryButton text="Speed Up" onPress={() => setSpeedModal(true)} />
                                    </View>
                                    <CancelAtempt
                                        cancelModal={cancelModal}
                                        setCancelModal={setCancelModal}
                                        setModalVisible={setModalVisible}
                                    />
                                    <SpeedUp
                                        speedModal={speedModal}
                                        setSpeedModal={setSpeedModal}
                                        setModalVisible={setModalVisible}

                                    />
                                </View> :
                                <Pressable onPress={() => setModalVisible(false)} style={{ alignItems: "center" }}>
                                    <Text style={{ paddingTop: 30, fontFamily: "Poppins_500Medium", color: "#FEBF32", fontSize: 16, lineHeight: 24 }}>View on Mainnet</Text>
                                </Pressable>
                        }





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
});
export default TransactionView