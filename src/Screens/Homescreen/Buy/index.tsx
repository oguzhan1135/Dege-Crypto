import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import WyreCard from "../../../../assets/images/WyreCard.svg"
import { Feather } from '@expo/vector-icons';
import WyreModal from "./WyreSupport";
interface BuyProps {
    setBuyModal: (buyModal: boolean) => void;
    buyModal: boolean;
}

const BuyModal: React.FC<BuyProps> = ({
    buyModal,
    setBuyModal,
}) => {

    const [wyreModal, setWyreModal] = useState(false);
    return (
        <Modal
            style={styles.blur}
            visible={buyModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 40 }}>
                            <Text style={styles.modalText}>Prurchase Method</Text>
                            <Pressable onPress={() => setBuyModal(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        <Text style={{ color: "white", fontSize: 18, lineHeight: 28, fontFamily: "Poppins_500Medium", textAlign: "center", paddingBottom: 64 }}>How do you want to make
                            your purchase?</Text>

                        <View style={{ gap: 40 }}>
                            <Pressable onPress={() => setWyreModal(true)} style={{ borderBottomColor: "#2a2d3c", borderBottomWidth: 1, gap: 8 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Apple Pay</Text>
                                    <Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>via</Text>
                                    <WyreCard style={{ transform: [{ scale: 1.3 }], marginLeft: 4 }} />
                                </View>
                                <View style={{ justifyContent: "space-between", flexDirection: "row", paddingBottom: 40 }}>
                                    <View style={{ gap: 0 }}>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>1-2 minutes</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Max $450 weekly</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Requires debit card</Text>
                                    </View>
                                    <View style={{ gap: 2, justifyContent: "flex-end", alignItems: "flex-end" }}>

                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                            <Feather name="info" size={24} color="#5F97FF" />
                                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>U.S. Only</Text>
                                        </View>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Some States excluded</Text>
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => setWyreModal(true)} style={{ borderBottomColor: "#2a2d3c", borderBottomWidth: 1, gap: 8 }}>
                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", maxWidth: 134 }}>Bank Transfer or
                                    Debit Card</Text>

                                <View style={{ justifyContent: "space-between", flexDirection: "row", paddingBottom: 40 }}>
                                    <View style={{ gap: 0 }}>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Requires registration</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", maxWidth: 163 }}>Option and fees vary based on location</Text>
                                    </View>
                                    <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>

                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                            <Feather name="info" size={24} color="#5F97FF" />
                                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>59 Countries</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </View>

                        {
                            wyreModal ?
                                <WyreModal
                                    buyModal={buyModal}
                                    setBuyModal={setBuyModal}
                                    setWyreModal={setWyreModal}
                                    wyreModal={wyreModal}
                                /> : null
                        }

                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

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
        paddingTop: 16,
        paddingHorizontal: 24,
        paddingBottom: 180
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontFamily: "Poppins_500Medium",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 24,
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
    },
});

export default BuyModal;
