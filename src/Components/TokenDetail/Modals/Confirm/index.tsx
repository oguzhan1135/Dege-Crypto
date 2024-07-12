import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";
import GradiantText from "../../../GradiantText";
import { MainContext } from "../../../../Context";
import EditNetworkEdit from "../EditNetworkFee";
import { Transaction } from "../../../../Router/types";

interface ConfirmProps {
    setSentModalVisible: (modalVisible: boolean) => void;
    sentModalVisible: boolean;
    modalStep: number;
    setModalStep: (modalStep: number) => void;
    timer?: number;
}

const Confirm: React.FC<ConfirmProps> = ({
    sentModalVisible,
    setModalStep,
    setSentModalVisible,
    modalStep,
    timer

}) => {
    const { receiverAccount, sentAccount, sentCoin, coinList, setAccounts, accounts, setSentAccount, setTokenFee, setSentMessage } = useContext(MainContext);
    const font = "Poppins_500Medium";
    const [modalVisible, setModalVisible] = useState(false);
    const [editFee, setEditFee] = useState<number>(0.12);

    const onchangeFee = (fee: number) => {
        setEditFee(fee);
    }
    useEffect(() => {
        setTokenFee(editFee)
    }, [editFee])

    useEffect(() => {
        setEditFee(0.12)
    }, [])


    const totalAmount = (sentCoin?.amount || 0) + (editFee || 0);
    const totalInUSD = (totalAmount * (coinList.find((coin) => coin.currency === sentCoin?.currency)?.rate || 0)).toFixed(2);

    const sentOperation = () => {
        const findAccountIndex = accounts.findIndex((account) => account.adress === sentAccount?.adress);
    
        const currentDate = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let hour = currentDate.getHours() + 3;  
        let minute = currentDate.getMinutes();
        let day = currentDate.getDate();
        const month = months[currentDate.getMonth()];
    
        if (minute >= 60) {
            hour += 1;
            minute -= 60;
        }
        if (hour >= 24) {
            hour -= 24;
            day += 1;
        }
        const formattedhour = hour < 10 ? `0${hour}` : hour;

        const formattedMinute = minute < 10 ? `0${minute}` : minute;
    
        const formattedDate = `${month} ${day} at ${formattedhour}:${formattedMinute}`;
        const amount = sentCoin?.amount;
    
        if (amount === undefined || sentCoin?.currency === undefined || receiverAccount?.adress === undefined) {
            console.error("Amount, currency or address not found");
            return;
        }
    
        const newTransaction: Transaction = {
            id: Math.floor(Math.random() * 90000) + 10000,
            type: "Sent",
            amount: amount,
            date: formattedDate,
            status: "Submitted",
            currency: sentCoin.currency,
            networkFee: editFee,
            paymenToAdress: receiverAccount.adress,
        };
    
        const updatedAccounts = [...accounts];
        updatedAccounts[findAccountIndex].transaction.push(newTransaction);
    
        const beforeBalance = updatedAccounts[findAccountIndex].balance.find((balance) => balance.coinName === sentCoin.currency);
        if (beforeBalance === undefined) {
            console.error("Balance not found");
            return;
        }
    
        const afterBalance = beforeBalance.balance - (editFee + amount);
        beforeBalance.balance = afterBalance;
    
        setAccounts(updatedAccounts);
        setSentAccount({
            id: updatedAccounts[findAccountIndex].id,
            name: updatedAccounts[findAccountIndex].name,
            avatar: updatedAccounts[findAccountIndex].avatar,
            adress: updatedAccounts[findAccountIndex].adress,
            transaction: updatedAccounts[findAccountIndex].transaction,
            balance: updatedAccounts[findAccountIndex].balance,
            password: updatedAccounts[findAccountIndex].password
        });
    
        setTimeout(() => {
            setSentModalVisible(false);
            setSentMessage("Submitted");
            setModalStep(1);
        }, 0);
    
        setTimeout(() => {
            const updatedTransactionIndex = updatedAccounts[findAccountIndex].transaction.findIndex((transaction) => transaction.id === newTransaction.id);
    
            if (updatedTransactionIndex !== -1) {
                updatedAccounts[findAccountIndex].transaction[updatedTransactionIndex].status = "Confirmed";
                setAccounts([...updatedAccounts]);
            }
        }, timer);
    };
    


    return (
        <Modal
            visible={sentModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Confirm</Text>
                            <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>

                        <View style={{ alignItems: "center", gap: 16, width: "100%" }}>
                            <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Amount</Text>
                            <View style={{ paddingBottom: 24 }}>
                                <GradiantText text={`${sentCoin?.amount} ${sentCoin?.currency}`} fontSize={40} lineHeight={56} width={350} row={1} />
                            </View>
                        </View>

                        <View style={{ gap: 16, paddingBottom: 48 }}>
                            <View>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>From</Text>
                                <View style={{ alignItems: "center", flexDirection: "row", gap: 8, padding: 16 }}>
                                    <View style={styles.iconContainer}>
                                        {sentAccount?.avatar}
                                    </View>
                                    <View style={{ gap: 4 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: font, color: "white" }}>
                                            {sentAccount?.name}
                                        </Text>
                                        <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: font, color: "#ABAFC4" }}>
                                            Balance: {sentCoin ? parseFloat(sentCoin?.balance.toFixed(2)) : 0} {sentCoin?.currency}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>To</Text>

                                <View style={{ alignItems: "center", flexDirection: "row", padding: 16, justifyContent: "space-between", paddingBottom: 40 }}>
                                    <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
                                        <View style={styles.iconContainer}>
                                            {receiverAccount?.avatar}
                                        </View>
                                        <View style={{ gap: 4 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                                {receiverAccount?.name}
                                            </Text>
                                            <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>
                                                {receiverAccount?.adress}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingVertical: 16, gap: 8, borderRadius: 8, borderWidth: 1, borderColor: "#242424" }}>
                                    <View style={{ gap: 16 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Amount</Text>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{sentCoin?.amount} {sentCoin?.currency}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 2, paddingHorizontal: 16, paddingBottom: 16, borderBottomColor: "#242424" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Network fee</Text>
                                                <Pressable onPress={() => setModalVisible(true)}>
                                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#FEBF32" }}>Edit</Text>
                                                </Pressable>
                                            </View>
                                            <EditNetworkEdit
                                                setModalVisible={setModalVisible}
                                                modalVisible={modalVisible}
                                                onchangeFee={onchangeFee}
                                            />
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{editFee} {sentCoin?.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                            {parseFloat(totalAmount.toFixed(4))} {sentCoin?.currency}
                                        </Text>
                                    </View>
                                    <Text style={{ marginLeft: "auto", color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", paddingHorizontal: 16 }}>
                                        ${parseFloat(totalInUSD).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <PrimaryButton text='Send' onPress={() => sentOperation()} />
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

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
    }
});

export default Confirm;
