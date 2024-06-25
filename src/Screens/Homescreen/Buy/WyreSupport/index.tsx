import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import SecondaryButton from "../../../../Components/Buttons/Secondary";
interface WyreProps {
    setBuyModal: (buyModal: boolean) => void;
    buyModal: boolean;
    setWyreModal: (wyreModal: boolean) => void;
    wyreModal: boolean;
}

const WyreModal: React.FC<WyreProps> = ({
    buyModal,
    setBuyModal,
    setWyreModal
}) => {

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
                            <Text style={styles.modalText}>Wyre Support</Text>
                        </View>
                        <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium",paddingBottom:8 }}>
                            Paying with Apple pay, powered by Wyre is support in the United States except for CT, HI, NC, NH, NY, VA and VT.
                        </Text>
                        <Text style={{ paddingBottom:40,color: "#5F97FF", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Wyre terms of service apply</Text>

                        <SecondaryButton text="Close" onPress={() => {
                            setBuyModal(false)
                            setWyreModal(false)
                        }
                        } />

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
        paddingBottom: 40
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

export default WyreModal;
