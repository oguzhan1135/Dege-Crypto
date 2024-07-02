import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Swap from "./Swap";
import { MainContext } from "../../Context";
const TabBar = () => {

    const [activeTabBar, setActiveTabBar] = useState("wallet");
    const [amount, setAmount] = useState("");
    const [swapModal, setSwapModal] = useState(false);

    const handleTabPress = (tab: string) => {
        setActiveTabBar(tab);
    };
    const { swapMessage } = useContext(MainContext);
    useEffect(()=>{
        if(swapMessage === "Submitted"){
            setActiveTabBar("wallet")
        }
    },[swapMessage])
    return (
        <View style={styles.tabBar}>
            <Pressable onPress={() => handleTabPress("wallet")} style={{ flex: 1 }}>
                <View style={styles.tabBarContentBox}>
                    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Entypo name="wallet" style={activeTabBar === "wallet" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={activeTabBar === "wallet" ? styles.activeTabBarText : styles.deActiveTabBarText}>Wallet</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={() => {
                handleTabPress("swap")
                setSwapModal(true);
            }} style={{ flex: 1 }}>
                <View style={styles.tabBarContentBox}>
                    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <MaterialCommunityIcons name="swap-horizontal-circle-outline" style={activeTabBar === "swap" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={activeTabBar === "swap" ? styles.activeTabBarText : styles.deActiveTabBarText}>Swap</Text>
                    </View>
                </View>
            </Pressable>
            <Swap
                setSwapModal={setSwapModal}
                swapModal={swapModal}
                amount={amount}
                setAmount={setAmount}

            />
            <Pressable onPress={() => handleTabPress("setting")} style={{ flex: 1 }}>
                <View style={styles.tabBarContentBox}>
                    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Ionicons name="settings-outline" style={activeTabBar === "setting" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={activeTabBar === "setting" ? styles.activeTabBarText : styles.deActiveTabBarText}>Settings</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
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
})

export default TabBar;