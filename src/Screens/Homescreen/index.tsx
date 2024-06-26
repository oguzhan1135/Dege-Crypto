import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView, Modal } from "react-native";
import User1 from '../../../assets/images/User-1.svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradiantText from "../../Components/GradiantText";
import AntDesign from '@expo/vector-icons/AntDesign';
import HBomeShape from "../../../assets/images/HomeShape.svg";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SwapShape from "../../../assets/images/SwapShape.svg";
import { BlurView } from "expo-blur";
import Network from "./Network";
import Account from "./Account";
import { useAppNavigation } from "../../Router/useAppNavigation";
import { MainContext } from "../../Context";
import { Accounts, CoinListItem } from "../../Router/types";
import AddCollectibles from "./AddCollectibles";
import Receive from "./Receive";
import BuyModal from "./Buy";
import AddTokenModal from "./AddToken";

const Homescreen: React.FC = () => {
    const [activeTabBar, setActiveTabBar] = useState("wallet");
    const [activeTab, setActiveTab] = useState('Token');
    const navigation = useAppNavigation()
    const { sentAccount, setSentAccount } = useContext(MainContext)
    const [collectiblesModal, setCollectiblesModal] = useState(false);
    const [receiveModal, setReceiveModal] = useState<boolean>(false)
    const [buyModal, setBuyModal] = useState(false);
    const [addTokenModal, setAddTokenModal] = useState(false);
    const handleTabPress = (tab: string) => {
        setActiveTabBar(tab);
    };
    useEffect(() => {
        setSentAccount(
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
                ]
            })

    }, [])

    const coinBalance = (coin: CoinListItem) => {
        return sentAccount?.balance.find((balance) => balance.coinName === coin.currency)?.balance.toFixed(2)
    }
    const { coinList } = useContext(MainContext)
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
                <GradiantText text={`${sentAccount?.balance[3].balance} ETH`} row={1} lineHeight={56} fontSize={40} width={300} />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>$16,858.15</Text>
                    <Text style={{ color: "#76E268", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>+0.7%</Text>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <AntDesign name="arrowup" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Sent</Text>
                </View>
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
                                coinList.map((coin) =>
                                    <Pressable key={coin.currency} onPress={() => {
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
            <View style={styles.tabBar}>
                <Pressable onPress={() => handleTabPress("wallet")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <Entypo name="wallet" style={activeTabBar === "wallet" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTabBar === "wallet" ? styles.activeTabBarText : styles.deActiveTabBarText}>Wallet</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleTabPress("swap")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <MaterialCommunityIcons name="swap-horizontal-circle-outline" style={activeTabBar === "swap" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTabBar === "swap" ? styles.activeTabBarText : styles.deActiveTabBarText}>Swap</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleTabPress("setting")} style={{ flex: 1 }}>
                    <View style={styles.tabBarContentBox}>
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <Ionicons name="settings-outline" style={activeTabBar === "setting" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                            <Text style={activeTabBar === "setting" ? styles.activeTabBarText : styles.deActiveTabBarText}>Settings</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
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
