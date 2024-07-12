import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { BlurView } from "expo-blur";
import User1 from '../../../../assets/images/User-1.svg'
import { AntDesign } from '@expo/vector-icons';
import NewAccountuser from "../../../../assets/images/NewAccountAvatar.svg";
import { MainContext } from "../../../Context";
import { AccountProp, Accounts } from "../../../Router/types";

const Account: React.FC<AccountProp> = ({ currency }) => {
    const font = "Poppins_500Medium";
    const { accounts, sentAccount, setSentAccount } = useContext(MainContext);


    const [modalVisible, setModalVisible] = useState(false);
    let [user, setUser] = useState<Accounts>()
    useEffect(() => {
        if (sentAccount) {
            setUser(sentAccount)
        } else {
            setUser(
                {
                    id: 1,
                    name: "Account 1",
                    avatar: <User1 style={{
                        width: 32,
                        height: 32,
                        transform: [{ scale: 1.5 }]
                    }} />,
                    balance: [
                        {
                            coinName: "BNB",
                            balance: 19.2371
                        },
                        {
                            coinName: "USDC",
                            balance: 92.3
                        },
                        {
                            coinName: "SNX",
                            balance: 42.74
                        },
                        {
                            coinName: "ETH",
                            balance: 9.2362
                        }
                    ],
                    adress: "0x4Dc6...DxR9",
                    transaction: [
                        {
                            id: 1,
                            type: "Received",
                            amount: 0.04,
                            date: "Mar 3 at 10:04am",
                            networkFee: 0.12,
                            paymenToAdress: "0x3Dc6...DxE9",
                            currency: "BNB",
                            status: "Confirmed"
                        },
                        {
                            id: 2,
                            type: "Received",
                            amount: 1.88,
                            date: "Aug 14 at 10:04am",
                            networkFee: 0.13,
                            paymenToAdress: "0x3Dc6...DxE9",
                            currency: "BNB",
                            status: "Confirmed"
                        },
                        {
                            id: 3,
                            type: "Sent",
                            amount: 2.35,
                            date: "Sep 4 at 11:04am",
                            networkFee: 0.08,
                            paymenToAdress: "0x3Dc6...DxE12",
                            currency: "BNB",
                            status: "Cancelled"
                        },
                        {
                            id: 4,
                            type: "Received",
                            amount: 1.876,
                            date: "Aug 3 at 10:04am",
                            networkFee: 0.12,
                            paymenToAdress: "0x3Dc6...DxL9",
                            currency: "USDC",
                            status: "Confirmed"
                        },
                        {
                            id: 5,
                            type: "Received",
                            amount: 410,
                            date: "Feb 3 at 10:04am",
                            networkFee: 0.12,
                            paymenToAdress: "0x3Dc6...DxL9",
                            currency: "USDC",
                            status: "Confirmed"
                        },
                        {
                            id: 6,
                            type: "Received",
                            amount: 100,
                            date: "Aug 30 at 10:04am",
                            networkFee: 0.12,
                            paymenToAdress: "0x3Dc6...DxL9",
                            currency: "USDC",
                            status: "Cancelled"
                        },
                        {
                            id: 7,
                            type: "Received",
                            amount: 3,
                            date: "Feb 12 at 10:04am",
                            networkFee: 0.13,
                            paymenToAdress: "0x3Dc6...DxE14",
                            currency: "SNX",
                            status: "Confirmed"
                        },
                        {
                            id: 8,
                            type: "Received",
                            amount: 10,
                            date: "Jan 21 at 10:04am",
                            networkFee: 0.13,
                            paymenToAdress: "0x3Dc6...DxE14",
                            currency: "SNX",
                            status: "Cancelled"
                        },
                    ],
                    password: "Example123"
                }
            )
            if (user) {
                setSentAccount(user)
            }

        }
    }, [])


    return (
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
                <View style={styles.iconContainer}>
                    {user?.avatar}
                </View>
                <View style={{ gap: 4 }}>
                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: font, color: "white" }}>
                        {user?.name}
                    </Text>
                    <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: font, color: "#ABAFC4" }}>
                        Balance: {user?.balance[3].balance} {currency}
                    </Text>
                </View>
            </View>


            <Modal
                style={styles.blur}
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <BlurView intensity={80} style={{ flex: 1 }}>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                        <View style={styles.modalView}>
                            <>
                                <Text style={styles.modalText}>Accounts</Text>
                                <View style={{ paddingBottom: 24 }}>
                                    {accounts.map((account) =>
                                        <Pressable key={account.id} onPress={() => {
                                            setUser(account);
                                            setModalVisible(false);
                                        }} style={styles.account}>
                                            <View style={{ gap: 8, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                                    <View style={{ paddingVertical: 4, paddingRight: 8, position: "relative" }}>
                                                        <View style={styles.iconContainer}>
                                                            {account.avatar}
                                                        </View>
                                                    </View>
                                                    <View style={{ gap: 1 }}>
                                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: font, color: "white" }}>
                                                            {account.name}
                                                        </Text>
                                                        <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: font, color: "#ABAFC4" }}>
                                                            {account.balance[3].balance} ETH
                                                        </Text>
                                                    </View>
                                                </View>

                                                {
                                                    user?.name === account.name ?
                                                        <AntDesign name="checkcircleo" size={24} color="#76E268" /> : null
                                                }


                                            </View>
                                        </Pressable>
                                    )}

                                </View>
                            </>

                        </View>
                    </View>
                </BlurView>
            </Modal>
            <AntDesign name="right" size={18} color="white" />

        </Pressable >
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 60
    },
    account: {
        padding: 16,
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 40,
        paddingHorizontal: 24
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
    icon: {
        width: 32,
        height: 32,
        transform: [{ scale: 1.5 }],
    },
});

export default Account;
