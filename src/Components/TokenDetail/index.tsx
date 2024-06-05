import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput } from 'react-native';
import { CoinListItem, OnboardingStackParamList, Recent, Transaction } from '../../Router/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppNavigation } from '../../Router/useAppNavigation';
import { AntDesign } from '@expo/vector-icons';
import GradiantText from '../GradiantText';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeShape from '../../../assets/images/HomeShape.svg'
import { BlurView } from 'expo-blur';
import { MainContext } from '../../Context';
import SentToV1 from './Modals/SentToV1';
import Amount from './Modals/Amount';
import Confirm from './Modals/Confirm';

type TokenDetailProps = NativeStackScreenProps<OnboardingStackParamList, 'TokenDetail'>;

const TokenDetail: React.FC<TokenDetailProps> = ({ route }) => {
    const { balance, currency, rate } = route.params;
    const [coin, setCoin] = useState<CoinListItem>();
    const [activeTab, setActiveTab] = React.useState("wallet");
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useAppNavigation()
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction>()
    const [sentModalVisible, setSentModalVisible] = useState(false);
    const [receivedModalVisible, setReceivedModalVisible] = useState(false);
    const [paymentTo, setPaymentTo] = useState<Recent>()
    const [modalStep, setModalStep] = useState(1)
    const [amount, setAmount] = useState("0.2405")
    const [sentAmount, setSentAmount] = useState(0)
    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };
    const { accounts, recent, sentAccount, coinList } = useContext(MainContext);
    useEffect(() => {
        setCoin(coinList.find((coin) => coin.currency === currency))

    }, [])
    return (
        <View style={styles.container}>
            <HomeShape style={{ position: "absolute", right: 0, top: "15%", transform: [{ scale: 1.2 }] }} />
            <View style={styles.navbar}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Onboarding", { screen: "Homescreen", })
                    }}
                    style={({ pressed }) => [
                        styles.navigationArrow,
                        {
                            backgroundColor: pressed ? '#44485F' : 'transparent',

                        }
                    ]}
                >
                    <AntDesign name="left" size={20} color="white" />
                </Pressable>

                <View style={styles.navigationContainer}>
                    <Text style={styles.navbarText}>{coin?.currency}</Text>
                </View>

            </View>

            <View style={styles.aset}>
                <GradiantText text={`${balance} ${currency}`} row={1} lineHeight={56} fontSize={40} width={300} />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>${rate * balance}</Text>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <Pressable onPress={() => setSentModalVisible(true)} style={styles.button}>
                    <AntDesign name="arrowup" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Sent</Text>
                </Pressable>
                <View style={styles.button}>
                    <AntDesign name="arrowdown" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Receive</Text>
                </View>

            </View>
            {
                modalStep === 1 ?
                    <SentToV1
                        setModalStep={setModalStep}
                        modalStep={modalStep}
                        paymentTo={paymentTo}
                        sentModalVisible={sentModalVisible}
                        setSentModalVisible={setSentModalVisible}
                        currency={currency}
                        recent={recent}
                        setPaymentTo={setPaymentTo}
                    />

                    : modalStep === 2 ?
                        <Amount
                            setAmount={setAmount}
                            amount={amount}
                            setModalStep={setModalStep}
                            setSentModalVisible={setModalVisible}
                            modalStep={modalStep}
                            sentModalVisible={sentModalVisible}
                            coin={coin}
                            setCoin={setCoin}
                        />  : modalStep === 3 ?
                                <Confirm
                                    setModalStep={setModalStep}
                                    modalStep={modalStep}
                                    setSentModalVisible={setModalVisible}
                                    sentModalVisible={modalVisible}
                                /> : null

            }

            <View style={{ paddingHorizontal: 24, gap: 8 }}>

                {
                    sentAccount?.transaction.map((transaction) =>
                        <Pressable onPress={() => {
                            setModalVisible(true);
                            setSelectedTransaction(transaction);
                        }}
                            style={styles.listItem}>
                            <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>{transaction.date}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <AntDesign name="arrowdown" size={24} style={{ paddingHorizontal: 5 }} color="#76E268" />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                                    <View style={{ flexDirection: "column", gap: 4 }}>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>{transaction.type} {currency}</Text>

                                        {
                                            transaction.type === "Received" ?
                                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text> :
                                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#EA3943" }}>Cancelled</Text>
                                        }
                                    </View>
                                    <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>{transaction.amount} {currency}</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>${(rate * transaction.amount).toFixed(5)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )

                }
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
                                <Text style={styles.modalText}>Recived {currency}</Text>
                                <View style={{ gap: 2, paddingVertical: 16 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Status</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Date</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                                        <Text style={{ color: "white", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>{selectedTransaction?.date}</Text>
                                    </View>
                                </View>
                                <View style={{ gap: 2, paddingVertical: 16 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>From</Text>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>To</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>0x3Dc6...DfCE</Text>
                                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>0x3Dc6...DfF9</Text>
                                    </View>
                                </View>
                                <View style={{ gap: 2, paddingVertical: 16 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Nonce</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, color: "white" }}>#0</Text>
                                    </View>
                                </View>
                                <View style={{ paddingVertical: 16, gap: 8, borderRadius: 8, borderWidth: 1, borderColor: "#242424" }}>
                                    {
                                        selectedTransaction?.type === "Sent" &&
                                        <View style={{ gap: 16 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{selectedTransaction.amount} {currency}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 2, paddingHorizontal: 16, paddingBottom: 16, borderBottomColor: "#242424" }}>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Network fee</Text>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>0.21 {currency}</Text>
                                            </View>
                                        </View>
                                    }
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                        {selectedTransaction &&
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                                {selectedTransaction.type === "Sent"
                                                    ? `${(selectedTransaction.amount + 0.21).toFixed(5)} ${currency}`
                                                    : `${selectedTransaction.amount.toFixed(5)} ${currency}`}
                                            </Text>
                                        }
                                    </View>
                                    {selectedTransaction &&
                                        <Text style={{ marginLeft: "auto", color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", paddingHorizontal: 16 }}>
                                            ${selectedTransaction.type === "Sent"
                                                ? ((selectedTransaction.amount + 0.21) * rate).toFixed(5)
                                                : (selectedTransaction.amount * rate).toFixed(5)}
                                        </Text>
                                    }
                                </View>

                                <Pressable onPress={() => setModalVisible(false)} style={{ alignItems: "center" }}>
                                    <Text style={{ paddingTop: 30, fontFamily: "Poppins_500Medium", color: "#FEBF32", fontSize: 16, lineHeight: 24 }}>View on Mainnet</Text>
                                </Pressable>



                            </View>
                        </View>
                    </BlurView>
                </Modal>
            </View>
            <View style={styles.tabBar}>
                <Pressable onPress={() => handleTabPress("wallet")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <Entypo name="wallet" style={activeTab === "wallet" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTab === "wallet" ? styles.activeTabBarText : styles.deActiveTabBarText}>Wallet</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleTabPress("swap")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <MaterialCommunityIcons name="swap-horizontal-circle-outline" style={activeTab === "swap" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTab === "swap" ? styles.activeTabBarText : styles.deActiveTabBarText}>Swap</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleTabPress("setting")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <Ionicons name="settings-outline" style={activeTab === "setting" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTab === "setting" ? styles.activeTabBarText : styles.deActiveTabBarText}>Settings</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
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
        top: "60%",
        borderRadius: 50,
        padding: 5
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
