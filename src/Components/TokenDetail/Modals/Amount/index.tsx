import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";
import GradiantText from "../../../GradiantText";
import { MainContext } from "../../../../Context";
import SelectToken, { Data } from "../SelectToken";
import { CoinListItem } from "../../../../Router/types";

interface AmountProps {
    setSentModalVisible: (sentmodalVisible: boolean) => void;
    sentModalVisible: boolean;
    setAmount: (amount: string) => void;
    amount: string;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
    coin?: CoinListItem;
    setCoin: (coin: CoinListItem) => void;
    currency?: string;
}

const Amount: React.FC<AmountProps> = ({
    sentModalVisible,
    setModalStep,
    setSentModalVisible,
    modalStep,
    amount,
    setAmount,
    coin
}) => {
    const [coinSelect, setCoinSelect] = useState(false);
    const [getCoin, setGetCoin] = useState({ coin: "BNB", index: 1 });
    const { sentAccount, coinList, setSentCoin } = useContext(MainContext);
    const [message, setMessage] = useState("");

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
            visible={sentModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                        <View style={[styles.modalView, { position: "relative" }]}>
                            <View style={{ paddingBottom: 0 }}>
                                <Text style={styles.modalText}>Amount</Text>
                                <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "12%", right: 0, padding:10 }}>
                                    <AntDesign name="close" size={18} color="white" />
                                </Pressable>
                                <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                    <AntDesign name="left" size={18} color="white" />
                                </Pressable>
                            </View>
                            <View style={{ alignItems: "center", position: "relative", paddingBottom: 60 }}>
                                <Pressable onPress={() => setCoinSelect(true)} style={{ borderRadius: 8, paddingVertical: 12, paddingLeft: 16, paddingRight: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 2, borderColor: "#2a2d3c", gap: 30 }}>
                                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{getCoin.coin}</Text>
                                    <AntDesign name='down' size={16} color={"white"} />
                                </Pressable>
                                <Pressable style={{ position: "absolute", right: 0, top: "25%" }} onPress={() => useMax()}>
                                    <Text style={{ color: "#FEBF32", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Use Max</Text>
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
                                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>$ {calculatedAmount}</Text>
                                    <FontAwesome6 name="money-bill-transfer" size={18} color="white" />
                                </View>
                            </View>
                            <View style={{ alignItems: "center", paddingBottom: 80 }}>
                                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>
                                    Balance: {
                                        (() => {
                                            if (!sentAccount || !sentAccount.balance) return "0.0000";
                                            const foundBalance = sentAccount.balance.find((balance) => balance.coinName === getCoin.coin);
                                            return foundBalance ? parseFloat(foundBalance.balance.toFixed(4)) : "0.0000";
                                        })()
                                    } {getCoin.coin}
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                {message !== "" && (
                                    <View style={{ backgroundColor: "#301c1c", borderRadius: 10, padding: 10, position: "absolute", bottom: 25 }}>
                                        <Text style={{ color: "red", fontSize: 16, lineHeight: 30, fontFamily: "Poppins_500Medium" }}>{message}</Text>
                                    </View>
                                )}
                            </View>
                            <PrimaryButton
                                text="Next"
                                onPress={() => {
                                    if (coinBalance !== undefined) {
                                        amountControl(amount, coinBalance);
                                    } else {
                                        setMessage("Unable to retrieve balance.");
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
        fontSize: 40,
        lineHeight: 56,
        color: 'transparent',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: 56,
        zIndex: 100
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
