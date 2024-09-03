import { BlurView } from "expo-blur";
import React, { useContext, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import PrimaryButton from "../../../../Components/Buttons/Primary/index";
import GradiantText from "../../../..//Components/GradiantText";
import { MainContext } from "../../../../Context";
import SelectToken, { Data } from "../../../../Components/TokenDetail/Modals/SelectToken";

interface AmountProps {
    setReceiveModalVisible: (modalVisible: boolean) => void;
    receiveModalVisible: boolean;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const Amount: React.FC<AmountProps> = ({
    receiveModalVisible,
    setModalStep,
    setReceiveModalVisible,
    modalStep,
}) => {
    const [coinSelect, setCoinSelect] = useState(false);
    const [getCoin, setGetCoin] = useState({ coin: "BNB", index: 1 });
    const { sentAccount, coinList } = useContext(MainContext);

    const onchangeCoin = (coinData: Data) => {
        setGetCoin(coinData);
    };

    const [amount, setAmount] = useState('0');
    const calculatedAmount = () => {
        let calculatedAmount = ((parseFloat(amount)) * (coinList.find((coin) => coin.currency === getCoin.coin)?.rate || 0)).toFixed(2);
        if (parseFloat(calculatedAmount) < 0 || !parseFloat(calculatedAmount)) {
            calculatedAmount = "0"
        }
        return calculatedAmount;
    };

    return (
        <Modal
            style={styles.blur}
            visible={receiveModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                        <View style={[styles.modalView, { position: "relative" }]}>
                            <View style={{ paddingBottom: 0 }}>
                                <Text style={styles.modalText}>Amount</Text>
                                <Pressable onPress={() => setReceiveModalVisible(false)} style={{ position: "absolute", top: "12%", right: 0, padding:10 }}>
                                    <AntDesign name="close" size={18} color="white" />
                                </Pressable>
                                <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "12%", left: 0, padding:10 }}>
                                    <AntDesign name="left" size={18} color="white" />
                                </Pressable>
                            </View>
                            <View style={{ alignItems: "center", position: "relative", paddingBottom: 60 }}>
                                <Pressable onPress={() => setCoinSelect(true)} style={{ borderRadius: 8, paddingVertical: 12, paddingLeft: 16, paddingRight: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 2, borderColor: "#2a2d3c", gap: 30 }}>
                                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{getCoin.coin}</Text>
                                    <AntDesign name='down' size={16} color={"white"} />
                                </Pressable>

                                <SelectToken coinSelect={coinSelect} setCoinSelect={setCoinSelect} onchangeCoin={onchangeCoin} />
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
                                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>$ {calculatedAmount()}</Text>
                                    <FontAwesome5 name="money-bill-wave" size={18} color="white" />
                                </View>
                            </View>

                            <PrimaryButton
                                text="Next"
                                onPress={() => {
                                    setModalStep(modalStep + 1);
                                }}
                                disabled={parseFloat(calculatedAmount()) === 0 || amount === "0" ? true : false}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </BlurView>
        </Modal>
    );
};

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

export default Amount;
