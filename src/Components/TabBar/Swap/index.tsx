import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MainContext } from "../../../Context";
import PrimaryButton from "../../Buttons/Primary";
import SelectToken, { Data } from "../../TokenDetail/Modals/SelectToken";
import { Ionicons } from '@expo/vector-icons';
import GradiantText from "../../GradiantText";
import Confirm from "./Confirm";

interface SwapProps {
    setSwapModal: (swapModal: boolean) => void;
    swapModal: boolean;
    setAmount: (amount: string) => void;
    amount: string;
}

const Swap: React.FC<SwapProps> = ({
    swapModal,
    setSwapModal,
    amount,
    setAmount,
}) => {
    const [coinSelectFrom, setCoinSelectFrom] = useState(false);
    const [coinSelectTo, setCoinSelectTo] = useState(false);
    const [fromCoin, setFromCoin] = useState({ coin: "BNB", index: 1 });
    const [toCoin, setToCoin] = useState({ coin: "BNB", index: 1 });
    const { sentAccount, coinList } = useContext(MainContext);
    const [paddingBottom, setPaddingBottom] = useState(200);
    const [confirmModal, setConfirmModal] = useState(false)
    const [modalStep, setModalStep] = useState(1);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setPaddingBottom(20);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setPaddingBottom(200);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const { swapMessage, setSwapMessage } = useContext(MainContext)
    useEffect(() => {
        if (modalStep === 3) {
            setSwapModal(false)
            setAmount("")
            setModalStep(1)
            setSwapMessage("Submitted");
            setTimeout(() => {
                setSwapMessage("Confirmed")
            }, 2000);

        }
    }, [modalStep])


    const onchangeFromCoin = (coinData: Data) => {
        setFromCoin(coinData);
    };
    const onchangeToCoin = (coinData: Data) => {
        setToCoin(coinData);
    };

    let calculatedAmount = ((parseFloat(amount) || 0) * (coinList.find((coin) => coin.currency === fromCoin.coin)?.rate || 0)).toFixed(2);

    const useMax = () => {
        let maxAmount = sentAccount?.balance && sentAccount.balance[fromCoin.index - 1]
            ? (sentAccount.balance[fromCoin.index - 1].balance - 0.13).toFixed(5).replace(/\.?0+$/, '')
            : (0).toFixed(4).replace(/\.?0+$/, '');

        if (parseFloat(maxAmount) < 0.13) {
            setSwapMessage("Your balance is insufficient");
        } else {
            setAmount(maxAmount);
        }

    };

    const coinBalance = sentAccount?.balance && sentAccount.balance[fromCoin.index - 1]?.balance;

    let swapBalance = (parseFloat(calculatedAmount) / (coinList.find((coin) => coin.currency === toCoin.coin)?.rate))

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


                        <>
                            <View style={[styles.modalView, { position: "relative" }]}>
                                <View style={{ paddingBottom: 40 }}>
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

                                    <SelectToken coinSelect={coinSelectFrom} setCoinSelect={setCoinSelectFrom} onchangeCoin={onchangeFromCoin} />

                                    <View style={{ borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                                        <Pressable onPress={() => setCoinSelectFrom(true)} style={{ paddingVertical: 30, paddingRight: 24, paddingLeft: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRightWidth: 1, borderColor: "#2a2d3c", gap: 30 }}>
                                            <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{fromCoin.coin}</Text>
                                            <AntDesign name='down' size={16} color={"white"} />
                                        </Pressable>
                                        <View style={{ paddingLeft: 16 }}>
                                            <View style={{ position: "relative" }}>
                                                {amount !== "" ?
                                                    <>
                                                        <TextInput
                                                            style={{ fontSize: 40, lineHeight: 56, color: "transparent" }}
                                                            value={amount}
                                                            onChangeText={setAmount}
                                                            keyboardType='numeric'
                                                            maxLength={10}
                                                            selectionColor={"white"}
                                                        />
                                                        <View style={{ position: "absolute", width: "100%", zIndex: -1 }}>
                                                            <GradiantText text={amount} fontSize={40} lineHeight={56} width={500} row={1} />
                                                        </View>
                                                    </>
                                                    :
                                                    <>
                                                        <TextInput
                                                            style={{ fontSize: 40, lineHeight: 56, color: "#ABAFC4" }}
                                                            value={amount}
                                                            onChangeText={setAmount}
                                                            keyboardType='numeric'
                                                            maxLength={10}
                                                            selectionColor={"white"}
                                                        />
                                                        <Text style={{ position: "absolute", fontSize: 40, lineHeight: 56, color: "#ABAFC4" }}>0</Text>
                                                    </>
                                                }
                                                <Text style={{ fontSize: 14, lineHeight: 24, color: "white", paddingBottom: 4 }}>${calculatedAmount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ borderRadius: 8, backgroundColor: "#2A2D3C", paddingVertical: 12, paddingHorizontal: 16 }}>
                                            <Ionicons name="swap-vertical" size={24} color="#FEBF32" />
                                        </View>
                                    </View>

                                    <Text style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>To</Text>
                                    <View style={{ borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                                        <Pressable onPress={() => setCoinSelectTo(true)} style={{ paddingVertical: 30, paddingRight: 24, paddingLeft: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRightWidth: 1, borderColor: "#2a2d3c", gap: 30 }}>
                                            <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{toCoin.coin}</Text>
                                            <AntDesign name='down' size={16} color={"white"} />
                                        </Pressable>
                                        <View style={{ paddingLeft: 16 }}>
                                            <Text style={{ fontSize: 40, lineHeight: 56, color: "#ABAFC4" }}>{swapBalance.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    <SelectToken coinSelect={coinSelectTo} setCoinSelect={setCoinSelectTo} onchangeCoin={onchangeToCoin} />

                                </View>
                                <View style={{ paddingVertical: 16 }}>
                                    <PrimaryButton
                                        text="Swap"
                                        onPress={() => {
                                            setConfirmModal(true)
                                            setModalStep(modalStep + 1)
                                        }

                                        }
                                        disabled={parseFloat(amount) > sentAccount?.balance.find((balance) => balance.coinName === fromCoin.coin)?.balance || parseFloat(amount) <= 0 || amount === "" ? true : false}
                                    />
                                </View>

                            </View>
                        </>

                        {modalStep === 2 ?
                            <>
                                <Confirm
                                    setConfirmModal={setConfirmModal}
                                    confirmModal={confirmModal}
                                    setModalStep={setModalStep}
                                    modalStep={modalStep}
                                    fromAmount={parseFloat(amount)}
                                    toAmount={parseFloat(swapBalance.toFixed(2))}
                                    fromCoin={fromCoin.coin}
                                    toCoin={toCoin.coin}
                                />
                            </> :
                            null

                        }


                    </View>
                </TouchableWithoutFeedback>
            </BlurView>
        </Modal>
    );
};

export default Swap;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 0
    },
    modalView: {
        backgroundColor: "#11131D",
        padding: 16,
        width: "100%",
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
    modalText: {
        color: "white",
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        lineHeight: 24,
        textAlign: "center"
    },
});
