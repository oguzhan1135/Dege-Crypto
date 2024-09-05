import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppNavigation } from '../../Router/useAppNavigation';
import { MainContext } from '../../Context';
import GradiantText from '../GradiantText';
import HomeShape from '../../../assets/images/HomeShape.svg';
import User1 from '../../../assets/images/User-1.svg';
import SentToV1 from './Modals/SentToV1';
import Amount from './Modals/Amount';
import Confirm from './Modals/Confirm';
import TransactionView from './Modals/TransactionView';
import { OnboardingStackParamList, CoinListItem, Transaction, Recent } from '../../Router/types';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import Receive from '../../Screens/Homescreen/Receive';
import TabBar from '../TabBar';
import PrimaryButton from '../Buttons/Primary';
import Account from './Account';
import SelectToken from './Modals/SelectToken';

type TokenDetailProps = NativeStackScreenProps<OnboardingStackParamList, 'TokenDetail'>;

const TokenDetail: React.FC<TokenDetailProps> = ({ route }) => {
    const { currency, rate } = route.params;
    const [coin, setCoin] = useState<CoinListItem>();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useAppNavigation();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
    const [sentModalVisible, setSentModalVisible] = useState(false);
    const [paymentTo, setPaymentTo] = useState<Recent>({ id: 1, adress: "", avatar: <User1 />, name: "" });
    const [modalStep, setModalStep] = useState(1);
    const [amount, setAmount] = useState("0.2405");
    const [details, setDetails] = useState<Transaction[]>([]);
    const { accounts, recent, sentAccount, tokenFee, setSentMessage, sentMessage } = useContext(MainContext);
    const [message, setMessage] = useState("")
    const [timer, setTimer] = useState<number>();
    const [receiveModal, setReceiveModal] = useState<boolean>(false)



    useEffect(() => {
        const upgradeDetails = sentAccount?.transaction.filter((account) => account.currency === currency);
        if (upgradeDetails) {
            setDetails(upgradeDetails);
        }

    }, [sentAccount]);
    useEffect(() => {
        if (sentMessage === "Submitted") {
            setTimeout(() => {
                setSentMessage("Confirmed")
            }, 1500);
            setTimeout(() => {
                setSentMessage("")
            }, 1500);
        }

    }, [sentMessage])

    useEffect(() => {
        let timer1: NodeJS.Timeout | undefined;
        let timer2: NodeJS.Timeout | undefined;
        let waitTime1 = 0;
        let waitTime2 = 0;

        if (tokenFee === 0.13) {
            waitTime1 = 2000;
            waitTime2 = 4000;
            setTimer(2000)
        } else if (tokenFee === 0.12) {
            waitTime1 = 4000;
            waitTime2 = 6000;
            setTimer(4000)
        } else if (tokenFee === 0.08) {
            waitTime1 = 20000;
            waitTime2 = 22000;
            setTimer(20000)
        }

        if (modalStep === 4) {
            setMessage("Submitted");

            timer1 = setTimeout(() => {
                setMessage("Confirmed");
            }, waitTime1);

            timer2 = setTimeout(() => {
                setMessage("");
                setModalStep(1);
            }, waitTime2);

            return () => {
                if (timer1) clearTimeout(timer1);
                if (timer2) clearTimeout(timer2);
            };
        }
    }, [modalStep, tokenFee]);


    return (
        <View style={styles.container}>
            <HomeShape style={{ position: "absolute", right: 0, top: "15%", transform: [{ scale: 1.2 }] }} />
            <View style={styles.navbar}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Onboarding", { screen: "Homescreen" });
                    }}
                    style={({ pressed }) => [
                        styles.navigationArrow,
                        {
                            backgroundColor: pressed ? '#44485F' : 'transparent',
                        }
                    ]}
                >
                    <AntDesign name="left" size={24} color="white" style={{ paddingLeft: 10 }} />
                </Pressable>

                <View style={styles.navigationContainer}>
                    <Text style={styles.navbarText}>{currency}</Text>
                </View>
            </View>

            <View style={styles.aset}>
                <GradiantText
                    text={`${parseFloat(sentAccount?.balance.find((balance) => balance.coinName === currency)?.balance.toFixed(4)) ?? 0} ${currency}`}
                    row={1}
                    lineHeight={56}
                    fontSize={40}
                    width={300}
                />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>
                        ${rate * (parseFloat(sentAccount?.balance.find((balance) => balance.coinName === currency)?.balance.toFixed(2) ?? "0"))}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <Pressable onPress={() => {
                    setSentModalVisible(!sentModalVisible);
                }} style={styles.button}>
                    <AntDesign name="arrowup" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Sent</Text>
                </Pressable>
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
                            <View style={{ paddingBottom: modalStep === 1 ? 32 : 0 }}>
                            <Text style={styles.modalText}>{modalStep ===1?"Sent To":modalStep===2?"Amount":"Confirm"}</Text>
                                <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "12%", right: 0, padding:10 }}>
                                    <AntDesign name="close" size={18} color="white" />
                                </Pressable>
                                <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                    <AntDesign name="left" size={18} color="white" />
                                </Pressable>
                            </View>
                                    
                                    {
                                        modalStep === 1 ?
                                            <SentToV1
                                                setModalStep={setModalStep}
                                                modalStep={modalStep}
                                                paymentTo={paymentTo}
                                                currency={currency}
                                                recent={recent}
                                                setPaymentTo={setPaymentTo}
                                            />
                                            : modalStep === 2 ?
                                                <Amount
                                                    setAmount={setAmount}
                                                    amount={amount}
                                                    setModalStep={setModalStep}
                                                    modalStep={modalStep}
                                                    coin={coin}
                                                    setCoin={setCoin}

                                                /> : modalStep === 3 ?
                                                    <Confirm
                                                        setModalStep={setModalStep}
                                                        modalStep={modalStep}
                                                        setSentModalVisible={setSentModalVisible}
                                                        sentModalVisible={sentModalVisible}
                                                        timer={timer}
                                                    />
                                                    : null

                                    }


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </BlurView>
                </Modal>
                <Pressable style={styles.button} onPress={() => setReceiveModal(true)}>
                    <AntDesign name="arrowdown" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Receive</Text>
                </Pressable>
                <Receive
                    receiveModal={receiveModal}
                    setReceiveModal={setReceiveModal}
                />
            </View>


            {
                sentMessage === "Submitted" ?
                    <View style={{ position: "absolute", bottom: 90, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
                        <BlurView intensity={0} style={{ flex: 1, padding: 16, borderRadius: 8, backgroundColor: "#292618" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Feather name="clock" size={40} color="#FEBF32" />
                                <View style={{ gap: 4 }}>
                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Transaction Submitted</Text>
                                    <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 18 }}>Waiting for confirmation</Text>
                                </View>
                            </View>
                        </BlurView>
                    </View> : null}
            {

                sentMessage === "Confirmed" ?
                    <View style={{ position: "absolute", bottom: 90, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
                        <BlurView intensity={0} style={{ flex: 1, padding: 16, borderRadius: 8, backgroundColor: "#1e2720" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <AntDesign name="checkcircleo" size={40} color="#76E268" />
                                <View style={{ gap: 4 }}>
                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Transaction #0 Complete!</Text>
                                    <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 18 }}>Tap to view this transaction</Text>
                                </View>
                            </View>
                        </BlurView>
                    </View> : null
            }


            <ScrollView style={{ paddingHorizontal: 24, gap: 8, overflow: "scroll", maxHeight: 450 }}>
                {
                    details?.map((transaction) =>
                        <Pressable
                            key={transaction.id}
                            onPress={() => {
                                setModalVisible(true);
                                setSelectedTransaction(transaction);
                            }}
                            style={styles.listItem}
                        >
                            <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>{transaction.date}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <AntDesign name={transaction.type === "Sent" ? "arrowup" : "arrowdown"} size={24} style={{ paddingHorizontal: 5 }} color={transaction.type === "Sent" ? "#EA3943" : "#76E268"} />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                                    <View style={{ flexDirection: "column", gap: 4 }}>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>{transaction.type} {currency}</Text>
                                        {
                                            transaction.status === "Confirmed" ?
                                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                                                : transaction.status === "Cancelled" ?
                                                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#EA3943" }}>Cancelled</Text> :
                                                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#FEBF32" }}>Submitted</Text>
                                        }
                                    </View>
                                    <View style={{ flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>{transaction.amount} {currency}</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>${parseFloat((rate * transaction.amount).toFixed(5))}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )
                }
                <TransactionView
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    rate={rate}
                    currency={currency}
                    selectedTransaction={selectedTransaction}
                    fee={tokenFee}
                />
            </ScrollView>

            <TabBar />
        </View >
    );
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
        backgroundColor: 'rgb(0,0,0,10)',
    },
    activeTabBarIcon: {
        color: "#FEBF32",
        fontSize: 24
    },
    deActiveTabBarIcon: {
        color: "#ABAFC4",
        fontSize: 24
    },
    activeTabBarText: {
        fontFamily: "Poppins_700Bold",
        color: "#FEBF32",
        fontSize: 12,
        lineHeight: 18
    },
    deActiveTabBarText: {
        color: "#ABAFC4",
        fontFamily: "Poppins_700Bold",
        fontSize: 12,
        lineHeight: 18
    },
    listItem: {
        alignItems: "flex-start",
        gap: 8,
        paddingTop: 8,
        paddingBottom: 16,
        paddingRight: 16,
    },
    aset: {
        gap: 8,
        justifyContent: "flex-start",
        paddingHorizontal: 24,
    },
    navbar: {
        alignItems: "flex-start",
        flexDirection: "row",
        paddingTop: 18,
        paddingBottom: 18,
    },
    navbarText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Poppins_500Medium"
    },
    navigationContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    navigationArrow: {
        position: "absolute",
        top: "45%",
        borderRadius: 50,
        padding: 10,
        zIndex: 100
    },
    tabBar: {
        position: "absolute",
        flexDirection: "row",
        bottom: 0
    },
    tabBarContentBox: {
        paddingHorizontal: 25,
        paddingBottom: 25,
        paddingTop: 10,
    },
    button: {
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#2A2D3C",
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        paddingHorizontal: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 60,
        paddingBottom: 40,
        gap: 24,
        position: "relative"
    },
});

export default TokenDetail;
