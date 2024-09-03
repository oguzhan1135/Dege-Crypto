import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";
import { MainContext } from "../../../../Context";
import EditNetworkEdit from "../../../TokenDetail/Modals/EditNetworkFee";
import Slippage from "../SlippageTolerance";
import { Accounts } from "../../../../Router/types";

interface ConfirmProps {
    setConfirmModal: (confirmModal: boolean) => void;
    confirmModal: boolean;
    modalStep: number;
    timer?: number;
    setModalStep: (modalstep: number) => void
    fromCoin: string;
    toCoin: string;
    fromAmount: number;
    toAmount: number;
}

const Confirm: React.FC<ConfirmProps> = ({
    setConfirmModal,
    confirmModal,
    timer,
    setModalStep,
    modalStep,
    fromAmount,
    toAmount,
    fromCoin,
    toCoin

}) => {

    const { coinList, accounts, sentAccount, setSentAccount, setAccounts } = useContext(MainContext)
    const font = "Poppins_500Medium";
    const [editFee, setEditFee] = useState(0.12);
    const [slip, setSlip] = useState(2)
    const [feeModal, setFeeModal] = useState(false);
    const [slipModal, setSlipModal] = useState(false)
    const onchangeFee = (fee: number) => {
        setEditFee(fee);
    }
    const onchangeSlip = (slip: number) => {
        setSlip(slip);
    }

    useEffect(() => {
        setEditFee(0.13)
    }, [])

    const swapOperations = () => {
        let fromSwapBalance = fromAmount + editFee;
        const updatedAccounts = [...accounts];
        const findAccountIndex = sentAccount?.id;

        if (findAccountIndex === undefined || findAccountIndex < 1 || findAccountIndex > updatedAccounts.length) {
            console.error("Invalid findAccountIndex");
            return;
        }

        const accountIndex = findAccountIndex - 1;
        const fromCoinBalance = sentAccount?.balance.find(balance => balance.coinName === fromCoin);
        const toCoinBalance = sentAccount?.balance.find(balance => balance.coinName === toCoin);

        if (fromCoinBalance) {
            fromCoinBalance.balance -= fromSwapBalance;
        } else {
            console.error(`fromCoinBalance not found for ${fromCoin}`);
            return;
        }

        if (toCoinBalance) {
            toCoinBalance.balance += toAmount;
        } else {
            console.error(`toCoinBalance not found for ${toCoin}`);
            return;
        }
    };



    return (
        <Modal
            visible={confirmModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 70 }}>
                            <Text style={styles.modalText}>Confirm</Text>
                            <Pressable onPress={() => { setConfirmModal(false); setModalStep(modalStep - 1) }} style={{ position: "absolute", top: "25%", right: 0, padding:10, paddingTop:0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => {
                                setModalStep(modalStep - 1)
                            }} style={{ position: "absolute", top: "25%", left: 0, padding:10, paddingTop:0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ borderWidth: 1, paddingTop: 16, borderColor: "#2a2d3c", marginBottom: 133 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, paddingHorizontal: 16 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text style={styles.contentText}>Slippage tolerance</Text>
                                    <Pressable onPress={() => setSlipModal(true)}>
                                        <Text style={[styles.contentText, { color: "#FEBF32" }]}>Edit</Text>
                                    </Pressable>
                                </View>
                                <Slippage
                                    setModalVisible={setSlipModal}
                                    modalVisible={slipModal}
                                    onchangeSlip={onchangeSlip}
                                />
                                <Text style={styles.contentText}>{slip}%</Text>
                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: "#2a2d3c", flexDirection: "column", padding: 16, gap: 4 }}>
                                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <Text style={styles.contentText}>Rate</Text>
                                    <Text style={styles.contentText}>{fromAmount} {fromCoin}</Text>

                                </View>
                                <Text style={[styles.contentText, { textAlign: "right" }]}>= {toAmount} {toCoin}</Text>

                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: "#2a2d3c", flexDirection: "column", padding: 16, gap: 4 }}>
                                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <Text style={styles.contentText}>Inverse Rate</Text>
                                    <Text style={styles.contentText}>1 {fromCoin}</Text>

                                </View>
                                <Text style={[styles.contentText, { textAlign: "right" }]}>= {parseFloat((toAmount / fromAmount).toFixed(4))} {toCoin}</Text>

                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: "#2a2d3c", flexDirection: "column", padding: 16, gap: 4 }}>
                                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <Text style={styles.contentText}>USD Price</Text>
                                    <Text style={styles.contentText}>1 {fromCoin}</Text>

                                </View>
                                <Text style={[styles.contentText, { textAlign: "right" }]}>= ${coinList.find((coin) => coin.currency === fromCoin)?.rate}</Text>

                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: "#2a2d3c", justifyContent: "space-between", flexDirection: "row", padding: 16, gap: 4, }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text style={styles.contentText}>Estimated Fee</Text>
                                    <Pressable onPress={() => setFeeModal(true)}>
                                        <Text style={[styles.contentText, { color: "#FEBF32" }]}>Edit</Text>
                                    </Pressable>
                                </View>
                                <Text style={styles.contentText}>{editFee} BNB</Text>
                            </View>
                            <EditNetworkEdit
                                modalVisible={feeModal}
                                setModalVisible={setFeeModal}
                                onchangeFee={onchangeFee}
                            />
                        </View>
                        <PrimaryButton text="Swap" onPress={() => {
                            setModalStep(3)
                            setConfirmModal(false)
                            swapOperations()
                        }
                        } />

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
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    contentText: {
        fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white"
    }
});

export default Confirm;
