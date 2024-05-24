import React, { useState } from "react";
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
const Homescreen = () => {
    const [activeTab, setActiveTab] = useState("wallet");
    const navigation = useAppNavigation()
    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    const [coins, setCoins] = useState([
        {
            id: 1,
            coinName: "Binance Coin",
            currency: "BNB",
            balance: 19.2371,
            rate: 226.69,
            onTheRise: true,
            percent: 2
        },
        {
            id: 2,
            coinName: "USD Coin",
            currency: "USDC",
            balance: 92.3,
            rate: 1.00,
            onTheRise: true,
            percent: 4.3
        },
        {
            id: 1,
            coinName: "Synthetix",
            currency: "SNX",
            balance: 42.74,
            rate: 42.74,
            onTheRise: false,
            percent: 1.3
        }
    ])

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
                <GradiantText text="9.2362 ETH" row={1} lineHeight={56} fontSize={40} width={300} />
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
                <View style={styles.button}>
                    <AntDesign name="arrowdown" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Receive</Text>
                </View>
                <View style={styles.button}>
                    <MaterialIcons name="attach-money" size={24} color="#FEBF32" />
                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24 }}>Buy</Text>
                </View>
            </View>
            <View style={styles.tabContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
                    <View style={styles.tabButtonActive}>
                        <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>Token</Text>
                    </View>
                    <View style={styles.tabButtonDeactive}>
                        <Text style={{ color: "#888DAA", fontFamily: "Poppins_500Medium" }}>Collectibles</Text>
                    </View>
                </View>
                <ScrollView style={{ maxHeight: 350, overflow: "scroll" }}>
                    <View style={{ gap: 8 }}>

                        {
                            coins.map((coin) =>
                                <Pressable onPress={() => {
                                    navigation.navigate("Onboarding", { screen: "TokenDetail", params: { currency: coin.currency, balance: coin.balance } });
                                }} style={styles.coin}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                        <View style={styles.iconContainer}>

                                        </View>
                                        <View style={{ flexDirection: "column", gap: 2, justifyContent: "flex-start" }}>
                                            <Text style={styles.coinTitle}>{coin.coinName}</Text>
                                            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>${coin.currency}</Text>
                                                {
                                                    coin.onTheRise ?
                                                        <Text style={{ fontFamily: "Poppins_500Medium", color: '#76E268' }}>+ {coin.percent}%</Text> :
                                                        <Text style={{ fontFamily: "Poppins_500Medium", color: '#EA3943' }}>- {coin.percent}%</Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                        <Text style={styles.coinTitle}>{coin.balance} {coin.currency}</Text>
                                    </View>
                                </Pressable>
                            )
                        }


                    </View>

                </ScrollView>
                <Pressable style={{ padding: 16 }} onPress={() => console.log("Add Coin")}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
                        <Entypo name="plus" size={24} color="#FEBF32" />
                        <Text style={{ color: "#FEBF32", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 24 }}>Add Tokens</Text>
                    </View>
                </Pressable>
            </View >
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
        flexDirection: "row",
        marginTop: 50
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
