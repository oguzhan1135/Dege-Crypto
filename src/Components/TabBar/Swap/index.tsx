import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MainContext } from "../../../Context";
import PrimaryButton from "../../Buttons/Primary";
import SelectToken, { Data } from "../../TokenDetail/Modals/SelectToken";
import { Ionicons } from '@expo/vector-icons';

interface SwapProps {
    setSwapModal: (swapModal: boolean) => void;
    swapModal: boolean;
    setAmount: (amount: string) => void;
    amount: string;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const Swap: React.FC<SwapProps> = ({
    swapModal,
    setModalStep,
    setSwapModal,
    modalStep,
    amount,
    setAmount,
}) => {
    const [coinSelect, setCoinSelect] = useState(false);
    const [getCoin, setGetCoin] = useState({ coin: "BNB", index: 1 });
    const { sentAccount, coinList, setSentCoin } = useContext(MainContext);
    const [message, setMessage] = useState("");
    const [paddingBottom, setPaddingBottom] = useState(290);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setPaddingBottom(50);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setPaddingBottom(290);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const onchangeCoin = (coinData: Data) => {
        setGetCoin(coinData);
    };

    let calculatedAmount = ((parseFloat(amount) || 0) * (coinList.find((coin) => coin.currency === getCoin.coin)?.rate || 0)).toFixed(2);

    const useMax = () => {
        let maxAmount = sentAccount?.balance && sentAccount.balance[getCoin.index - 1]
            ? (sentAccount.balance[getCoin.index - 1].balance - 0.13).toFixed(5).replace(/\.?0+$/, '')
            : (0).toFixed(4).replace(/\.?0+$/, '');

        if (parseFloat(maxAmount) < 0.13) {
            setMessage("Your balance is insufficient");
        } else {
            setAmount(maxAmount);
        }

    };

    const amountControl = (amount: string, balance: number) => {
        if (balance - parseFloat(amount) < 0.13) {
            setModalStep(modalStep);
            setMessage("Your balance is insufficient");
        } else {
            setModalStep(3);
            setSentCoin({
                currency: getCoin.coin,
                amount: parseFloat(amount),
                balance: balance
            });
        }
    };

    const coinBalance = sentAccount?.balance && sentAccount.balance[getCoin.index - 1]?.balance;

    return (
        <Modal
            style={styles.blur}
            visible={swapModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                        <View style={[styles.modalView, { position: "relative" }]}>
                            <View style={{ paddingBottom: 0 }}>
                                <Text style={styles.modalText}>Swap</Text>
                                <Pressable onPress={() => setSwapModal(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                    <AntDesign name="close" size={18} color="white" />
                                </Pressable>
                            </View>
                            <View style={{ gap: 16, paddingBottom }}>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>From</Text>
                                    <Pressable style={{}} onPress={() => useMax()}>
                                        <Text style={{ color: "#FEBF32", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Use Max</Text>
                                    </Pressable>
                                </View>

                                {/* <SelectToken coinSelect={coinSelect} setCoinSelect={setCoinSelect} onchangeCoin={onchangeCoin} /> */}


                                <View style={{ borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                                    <Pressable onPress={() => setCoinSelect(true)} style={{ paddingVertical: 30, paddingRight: 24, paddingLeft: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRightWidth: 1, borderColor: "#2a2d3c", gap: 30 }}>
                                        <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{getCoin.coin}</Text>
                                        <AntDesign name='down' size={16} color={"white"} />
                                    </Pressable>
                                    <View style={{ paddingLeft: 16 }}>
                                        <TextInput
                                            style={{ fontSize: 40, lineHeight: 56, color: "#ABAFC4" }}
                                            value={amount}
                                            onChangeText={setAmount}
                                            keyboardType='numeric'
                                            maxLength={10}
                                            selectionColor={"white"}
                                        />
                                        <Text style={{ fontSize: 14, lineHeight: 24, color: "white", paddingBottom: 4 }}>${calculatedAmount}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ borderRadius: 8, backgroundColor: "#2A2D3C", paddingVertical: 12, paddingHorizontal: 16 }}>
                                        <Ionicons name="swap-vertical" size={24} color="#FEBF32" />
                                    </View>
                                </View>

                                <Text style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>To</Text>
                                <View style={{ borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                                    <Pressable onPress={() => setCoinSelect(true)} style={{ paddingVertical: 30, paddingRight: 24, paddingLeft: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRightWidth: 1, borderColor: "#2a2d3c", gap: 30 }}>
                                        <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{getCoin.coin}</Text>
                                        <AntDesign name='down' size={16} color={"white"} />
                                    </Pressable>
                                    <View style={{ paddingLeft: 16 }}>
                                        <Text style={{ fontSize: 40, lineHeight: 56, color: "#ABAFC4" }}>0</Text>
                                    </View>
                                </View>

                            </View>
                            <PrimaryButton
                                text="Swap"
                                onPress={() => {
                                    if (coinBalance !== undefined) {
                                        amountControl(amount, coinBalance);
                                    } 
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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

export default Swap;
