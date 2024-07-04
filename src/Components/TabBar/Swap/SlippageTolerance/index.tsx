import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MainContext } from "../../../../Context";
import PrimaryButton from "../../../Buttons/Primary";
interface SlippageProp {
    onchangeSlip: (slip: number) => void;
    setModalVisible: (modalVisible: boolean) => void;
    modalVisible: boolean;
}
const Slippage: React.FC<SlippageProp> = ({ onchangeSlip, modalVisible, setModalVisible }) => {

    const [slip, setSlip] = useState(2)
    useEffect(() => {
        onchangeSlip(slip)
    }, [slip])

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
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ gap: 40 }}>
                            <Text style={styles.modalText}>Slippage tolerance</Text>
                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>
                                If the price changes between the time your order is placed and confirmed it’s called “slippage”.
                                Your swap will automatically cancel if slippage exceeds your “max slippage” setting.
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                                <Pressable onPress={() => setSlip(1)} style={slip === 1 ? styles.activePrice : styles.inActivePrice}>
                                    <Text style={slip === 1 ? styles.activeText : styles.inActiveText}>1%</Text>
                                </Pressable>
                                <Pressable onPress={() => setSlip(2)} style={slip === 2 ? styles.activePrice : styles.inActivePrice}>
                                    <Text style={slip === 2 ? styles.activeText : styles.inActiveText}>2%</Text>
                                </Pressable>
                                <View style={{ borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: "#2a2d3c", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <TextInput
                                        placeholder="Custom"
                                        placeholderTextColor={"#ABB0C4"}
                                        style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, width: 100 }}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        value={slip}
                                        onChangeText={setSlip}

                                    />
                                    <Text style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>%</Text>
                                </View>

                            </View>
                            <PrimaryButton text="Save" onPress={() => { setModalVisible(false) }} />

                        </View>



                    </View>
                </View>
            </BlurView>
        </Modal >
    )
}
const styles = StyleSheet.create({
    activePrice: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 8,
        backgroundColor: "#FEBF32"
    },
    inActivePrice: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 8,
        backgroundColor: "#2A2D3C"
    },
    activeText: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Poppins_500Medium",
        color: "black"
    },
    inActiveText: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Poppins_500Medium",
        color: "#FEBF32"
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
export default Slippage;