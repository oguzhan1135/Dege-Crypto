import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import User1 from '../../../assets/images/User-1.svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradiantText from "../../Components/GradiantText";
import AntDesign from '@expo/vector-icons/AntDesign';
import HBomeShape from "../../../assets/images/HomeShape.svg";
import { Entypo } from '@expo/vector-icons';
import Network from "./Network";
import Account from "./Account";
import { useAppNavigation } from "../../Router/useAppNavigation";
import { MainContext } from "../../Context";
import { CoinListItem, Recent } from "../../Router/types";
import AddCollectibles from "./AddCollectibles";
import Receive from "./Receive";
import BuyModal from "./Buy";
import AddTokenModal from "./AddToken";
import TabBar from "../../Components/TabBar";
import { BlurView } from "expo-blur";
import { Feather } from '@expo/vector-icons';
import Confirm from "../../Components/TokenDetail/Modals/Confirm";
import SentToV1 from "../../Components/TokenDetail/Modals/SentToV1";
import Amount from "../../Components/TokenDetail/Modals/Amount";

const Homescreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Token');
    const navigation = useAppNavigation()
    const { sentAccount, recent, setSentMessage, sentMessage } = useContext(MainContext)
    const [collectiblesModal, setCollectiblesModal] = useState(false);
    const [receiveModal, setReceiveModal] = useState<boolean>(false)
    const [buyModal, setBuyModal] = useState(false);
    const [addTokenModal, setAddTokenModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [amount, setAmount] = useState("0.2405");
    const [sentModalVisible, setSentModalVisible] = useState(false);
    const [paymentTo, setPaymentTo] = useState<Recent>({ id: 1, adress: "", avatar: <User1 />, name: "" });
    const [message, setMessage] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [coin, setCoin] = useState<CoinListItem>();
    const [timer, setTimer] = useState<number>();


    const coinBalance = (coin: CoinListItem) => {
        return sentAccount?.balance.find((balance) => balance.coinName === coin.currency)?.balance.toFixed(2)
    }
    const { coinList, swapMessage, setSwapMessage } = useContext(MainContext)
    useEffect(() => {
        if (swapMessage === "Submitted") {
            setTimeout(() => {
                setSwapMessage("Confirmed")
            }, 2000);
        }
        setTimeout(() => {
            setSwapMessage("")
        }, 2000);
    }, [swapMessage])
    useEffect(() => {
        if (sentMessage === "Submitted") {
            setTimeout(() => {
                setSentMessage("Confirmed")
            }, 1500);
        }
        if (sentMessage === "Confirmed") {
            setTimeout(() => {
                setSentMessage("")
            }, 1500);
        }

    }, [sentMessage])

    const userBalances = sentAccount?.balance || [];

    const userCoins = userBalances.map(balanceItem => {
        const coin = coinList.find(coin => coin.currency === balanceItem.coinName);
        return coin ? { ...coin, balance: balanceItem.balance } : null;
    }).filter(coin => coin !== null);

    return (
        <View style={styles.container}>
            <HBomeShape style={{ position: "absolute", right: 0, top: "18%", transform: [{ scale: 1.5 }] }} />
            <View style={styles.navbar}>
                <View style={styles.leftSection}>
                    <Account />
                </View>
                <View style={styles.centerSection}>
                    <Network />
                </View>
                <View style={styles.rightSection}></View>
            </View>
            <View style={styles.aset}>
                <GradiantText text={`${sentAccount?.balance.find((balance) => balance.coinName === "ETH")?.balance.toFixed(2)} ETH`} row={1} lineHeight={56} fontSize={40} width={300} />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{(1825 * (sentAccount?.balance.find((balance) => balance.coinName === "ETH")?.balance)).toFixed(2)}</Text>
                    <Text style={{ color: "#76E268", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>+0.7%</Text>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <Pressable onPress={() => { setSentModalVisible(true); console.log(sentModalVisible) }} style={styles.button}>
                    <AntDesign name="arrowup" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Sent</Text>
                </Pressable>


                <Pressable style={styles.button} onPress={() => setReceiveModal(true)}>
                    <AntDesign name="arrowdown" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Receive</Text>
                </Pressable>
                <Receive
                    receiveModal={receiveModal}
                    setReceiveModal={setReceiveModal}
                />
                <Pressable onPress={() => setBuyModal(true)} style={styles.button}>
                    <MaterialIcons name="attach-money" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Buy</Text>
                </Pressable>
                <BuyModal
                    buyModal={buyModal}
                    setBuyModal={setBuyModal}
                />
            </View>
            <View style={styles.tabContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
                    <Pressable onPress={() => setActiveTab('Token')} style={activeTab === 'Token' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                        <Text style={{ color: activeTab === 'Token' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Token</Text>
                    </Pressable>
                    <Pressable onPress={() => setActiveTab('Collectibles')} style={activeTab === 'Collectibles' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                        <Text style={{ color: activeTab === 'Collectibles' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Collectibles</Text>
                    </Pressable>
                </View>
                {activeTab === 'Token' && (
                    <ScrollView style={{ maxHeight: 320, overflow: "scroll" }}>
                        <View style={{ gap: 8 }}>
                            {
                                userCoins.map((coin, index) =>
                                    <View key={index}>
                                        <Pressable onPress={() => {
                                            navigation.navigate("Onboarding", { screen: "TokenDetail", params: { currency: coin.currency, balance: coinBalance(coin), rate: coin.rate } });
                                        }} style={styles.coin}>
                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                                <View style={styles.iconContainer}>
                                                </View>
                                                <View style={{ flexDirection: "column", gap: 2, justifyContent: "flex-start" }}>
                                                    <Text style={styles.coinTitle}>{coin.coinName}</Text>
                                                    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>${coin.rate}</Text>
                                                        {
                                                            coin.onTheRise ?
                                                                <Text style={{ fontFamily: "Poppins_500Medium", color: '#76E268' }}>+ {coin.percent}%</Text> :
                                                                <Text style={{ fontFamily: "Poppins_500Medium", color: '#EA3943' }}>- {coin.percent}%</Text>
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                <Text style={styles.coinTitle}>{coinBalance(coin)} {coin.currency}</Text>
                                            </View>
                                        </Pressable>
                                        <>
                                            {
                                                modalStep === 1 ?
                                                    <SentToV1
                                                        setModalStep={setModalStep}
                                                        modalStep={modalStep}
                                                        paymentTo={paymentTo}
                                                        sentModalVisible={sentModalVisible}
                                                        setSentModalVisible={setSentModalVisible}
                                                        currency={coin.currency}
                                                        recent={recent}
                                                        setPaymentTo={setPaymentTo}
                                                    />
                                                    : modalStep === 2 ?
                                                        <Amount
                                                            setAmount={setAmount}
                                                            amount={amount}
                                                            setModalStep={setModalStep}
                                                            setSentModalVisible={setSentModalVisible}
                                                            modalStep={modalStep}
                                                            sentModalVisible={sentModalVisible}
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

                                        </>
                                    </View>

                                )
                            }
                        </View>


                    </ScrollView>
                )}

                {activeTab === 'Collectibles' && (
                    <ScrollView style={{ maxHeight: 350, overflow: "scroll" }}>
                        <Text style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24, paddingVertical: 16 }}>CryptoKitties (2)</Text>
                        <View style={{ gap: 8 }}>
                            <View style={styles.coin}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                    <View style={styles.iconContainer}>
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2, justifyContent: "flex-start" }}>
                                        <Text style={styles.coinTitle}>Fabio Ahempip</Text>
                                        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                            <Text style={{ fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>$164.41</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                    <Text style={styles.coinTitle}>0.09 ETH</Text>
                                </View>
                            </View>
                            <View style={styles.coin}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                    <View style={styles.iconContainer}>
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2, justifyContent: "flex-start" }}>
                                        <Text style={styles.coinTitle}>Master Lubzap</Text>
                                        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                            <Text style={{ fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>$10,937.22</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                    <Text style={styles.coinTitle}>6 ETH</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
                {
                    activeTab === "Token" ?
                        <Pressable style={{ padding: 16 }} onPress={() => setAddTokenModal(true)}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
                                <Entypo name="plus" size={24} color="#FEBF32" />
                                <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>Add Tokens
                                </Text>
                            </View>
                        </Pressable> :
                        <Pressable style={{ padding: 16 }} onPress={() => setCollectiblesModal(true)}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
                                <Entypo name="plus" size={24} color="#FEBF32" />
                                <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>Add Collectibles
                                </Text>
                            </View>
                        </Pressable>

                }


                <AddCollectibles
                    collectiblesModal={collectiblesModal}
                    setCollectiblesModal={setCollectiblesModal}
                />
                <AddTokenModal
                    addTokenModal={addTokenModal}
                    setAddTokenModal={setAddTokenModal}
                />
            </View>
            <View style={{ alignItems: "center", width: "100%" }}>
                <>

                    {
                        swapMessage === "Submitted" ?
                            <View style={{ position: "absolute", bottom: 10, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
                                <BlurView intensity={0} style={{ flex: 1, padding: 16, borderRadius: 8, backgroundColor: "#292618" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <Feather name="clock" size={40} color="#FEBF32" />
                                        <View style={{ gap: 4 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Swap Coin </Text>
                                            <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 18 }}>Waiting for confirmation</Text>
                                        </View>
                                    </View>
                                </BlurView>
                            </View> : null}
                    {

                        swapMessage === "Confirmed" ?
                            <View style={{ position: "absolute", bottom: 10, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
                                <BlurView intensity={0} style={{ flex: 1, padding: 16, borderRadius: 8, backgroundColor: "#1e2720" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <AntDesign name="checkcircleo" size={40} color="#76E268" />
                                        <View style={{ gap: 4 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Swap #0 Complete!</Text>
                                            <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 18 }}>Tap to view this transaction</Text>
                                        </View>
                                    </View>
                                </BlurView>
                            </View> : null
                    }
                    {
                        swapMessage === "" ? null : null
                    }
                    {
                        sentMessage === "Submitted" ?
                            <View style={{ position: "absolute", bottom: 10, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
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
                            <View style={{ position: "absolute", bottom: 10, zIndex: 1, width: "100%", paddingHorizontal: 16, borderRadius: 8, overflow: "hidden" }}>
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


                </>
            </View>
            <TabBar />

        </View >
    );
}

const styles = StyleSheet.create({

    coinTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Poppins_700Bold",
        color: "white"
    },
    coin: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tabContainer: {
        flexDirection: "column",
        gap: 24,
        paddingHorizontal: 24,

    },
    tabButtonActive: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    tabButtonDeactive: {
        paddingHorizontal: 16,
        paddingVertical: 8,
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
    aset: {
        gap: 8,
        justifyContent: "flex-start",
        paddingHorizontal: 24,
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16,
        paddingHorizontal: 24,
    },
    leftSection: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    centerSection: {
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 60,
        paddingBottom: 40,
        gap: 24,
        position: "relative"
    },
    iconContainer: {
        backgroundColor: "#222531",
        overflow: "hidden",
        width: 36,
        height: 36,
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

export default Homescreen;
