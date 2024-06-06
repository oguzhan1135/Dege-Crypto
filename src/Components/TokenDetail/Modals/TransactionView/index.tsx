import { BlurView } from "expo-blur";
import React from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { Transaction } from "../../../../Router/types";

interface TransactionProp {
    setModalVisible: (modalVisible: boolean) => void;
    modalVisible: boolean;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
    currency: string;
    selectedTransaction?: Transaction;
    setSelectedTransaction: (selectedTransaction: Transaction) => void;
    rate: number;
}

const TransactionView: React.FC<TransactionProp> = ({ setModalVisible, modalVisible, modalStep, setModalStep, currency, selectedTransaction, setSelectedTransaction, rate }) => {

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
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
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
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>0.21 {currency}</Text>
                                    </View>
                                </View>
                            }
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                {selectedTransaction &&
                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                        {selectedTransaction.type === "Sent"
                                            ? `${(selectedTransaction.amount + 0.21).toFixed(5)} ${currency}`
                                            : `${selectedTransaction.amount.toFixed(5)} ${currency}`}
                                    </Text>
                                }
                            </View>
                            {selectedTransaction &&
                                <Text style={{ marginLeft: "auto", color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", paddingHorizontal: 16 }}>
                                    ${selectedTransaction.type === "Sent"
                                        ? ((selectedTransaction.amount + 0.21) * rate).toFixed(5)
                                        : (selectedTransaction.amount * rate).toFixed(5)}
                                </Text>
                            }
                        </View>

                        <Pressable onPress={() => setModalVisible(false)} style={{ alignItems: "center" }}>
                            <Text style={{ paddingTop: 30, fontFamily: "Poppins_500Medium", color: "#FEBF32", fontSize: 16, lineHeight: 24 }}>View on Mainnet</Text>
                        </Pressable>



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