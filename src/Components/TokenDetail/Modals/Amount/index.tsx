import { BlurView } from "expo-blur";
import React, { useContext, useEffect } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput } from "react-native";
import Account from "../../Account";
import { Accounts, CoinListItem, Recent } from "../../../../Router/types";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";
import GradiantText from "../../../GradiantText";
import { FontAwesome6 } from '@expo/vector-icons';
import { MainContext } from "../../../../Context";

interface AmountProps {
    setSentModalVisible: (modalVisible: boolean) => void;
    sentModalVisible: boolean;
    setAmount: (amount: string) => void;
    amount: string;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
    coin?: CoinListItem;
    setCoin: (coin: CoinListItem) => void;
    currency?: string;
    sentAccount?: Accounts

}

const Amount: React.FC<AmountProps> = (
    {
        sentModalVisible,
        setModalStep,
        setSentModalVisible,
        modalStep,
        amount,
        setAmount,
        coin,
        sentAccount


    }) => {
    let calculatedAmount = ((parseFloat(amount) || 0) * (coin?.rate || 0)).toFixed(4);

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
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Amount</Text>
                            <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ alignItems: "center", position: "relative", paddingBottom: 60 }}>
                            <View style={{ borderRadius: 8, paddingVertical: 12, paddingLeft: 16, paddingRight: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 2, borderColor: "#2a2d3c", gap: 30 }}>
                                <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>BNB</Text>
                                <AntDesign name='down' size={16} color={"white"} />
                            </View>
                            <Text style={{ position: "absolute", color: "#FEBF32", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", right: 0, top: "25%" }}>Use Max</Text>

                        </View>
                        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', paddingBottom: 40 }}>
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType='numeric'
                                style={styles.textInput}
                                maxLength={10}
                                selectionColor={"white"}


                            />
                            <View style={styles.overlayText}>
                                <GradiantText text={amount} fontSize={40} lineHeight={56} width={300} row={1} />
                            </View>
                        </View>
                        <View style={{ alignItems: "center", paddingTop: 36, paddingBottom: 24 }}>
                            <View style={{ backgroundColor: "#2A2D3C", borderRadius: 100, flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16, gap: 10 }}>
                                <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>$ {calculatedAmount}</Text>
                                <FontAwesome6 name="money-bill-transfer" size={18} color="white" />
                            </View>
                        </View>
                        <View style={{ alignItems: "center",paddingBottom:80 }}>
                            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>Balance: {sentAccount?.balance}</Text>
                        </View>
                        <PrimaryButton text="Next" onPress={()=> setModalStep(modalStep + 1 )} />
                    </View>
                </View>
            </BlurView>
        </Modal>
    )

}
const styles = StyleSheet.create({
    textInput: {
        fontSize: 42,
        lineHeight: 56,
        color: 'transparent',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: 56,
    },
    overlayText: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

    },
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
export default Amount