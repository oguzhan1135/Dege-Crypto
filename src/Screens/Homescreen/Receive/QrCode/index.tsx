import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import QrCode from '../../../../../assets/images/qr-doge.svg'

interface QrCodeProps {
    setReceiveModalVisible: (modalVisible: boolean) => void;
    receiveModalVisible: boolean;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const QrCodeModal: React.FC<QrCodeProps> = ({
    receiveModalVisible,
    setModalStep,
    setReceiveModalVisible,
    modalStep,
}) => {
    const [second, setSecond] = useState(5);

    useEffect(() => {
        if (receiveModalVisible) {
            const interval = setInterval(() => {
                setSecond(prevSecond => {
                    if (prevSecond <= 1) {
                        clearInterval(interval);
                        setSecond(0)
                        return 5;
                    }
                    return prevSecond - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [receiveModalVisible]);

    return (
        <Modal
            style={styles.blur}
            visible={receiveModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative", gap: 24, alignItems: "center" }]}>
                        <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Sent Link</Text>
                        <QrCode />
                        <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Payment Request QR Code</Text>
                        <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Modal will close after {second} seconds</Text>
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
        paddingBottom: 100
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

export default QrCodeModal;
