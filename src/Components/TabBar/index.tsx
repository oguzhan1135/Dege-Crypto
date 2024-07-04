import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Swap from "./Swap";
import { MainContext } from "../../Context";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const TabBar = () => {
    const [amount, setAmount] = useState("");
    const [swapModal, setSwapModal] = useState(false);

    const { swapMessage } = useContext(MainContext);
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes);
    const currentRouteName = routes[routes.length - 1]?.name;

    useEffect(() => {
        if (swapMessage === "Submitted") {
            navigation.navigate("Onboarding", {screen: "Homescreen"});
        }
    }, [swapMessage]);

    const handleTabPress = (tab: string) => {
        if (tab === "wallet") {
            navigation.navigate("Onboarding", { screen: "Homescreen" });
        } else if (tab === "setting") {
            navigation.navigate("Onboarding", { screen: "Setting" });
        } else if (tab === "swap") {
            setSwapModal(true);
        }
    };

    return (
        <View style={styles.tabBar}>
            <Pressable onPress={() => handleTabPress("wallet")} style={{ flex: 1 }}>
                <View style={styles.tabBarContentBox}>
                    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Entypo name="wallet" style={currentRouteName === "Homescreen"  ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={currentRouteName === "Homescreen" ? styles.activeTabBarText : styles.deActiveTabBarText}>Wallet</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={() => handleTabPress("swap")} style={{ flex: 1 }}>
                <View style={styles.tabBarContentBox}>
                    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <MaterialCommunityIcons name="swap-horizontal-circle-outline" style={swapModal ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={swapModal ? styles.activeTabBarText : styles.deActiveTabBarText}>Swap</Text>
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
                        <Ionicons name="settings-outline" style={currentRouteName === "Setting" || currentRouteName === "Preferences" ? styles.activeTabBarIcon : styles.deActiveTabBarIcon} />
                        <Text style={currentRouteName === "Setting" ? styles.activeTabBarText : styles.deActiveTabBarText}>Settings</Text>
                    </View>
                </View>
            </Pressable>
        </View>
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
        alignItems:"center",
        bottom: 0,
    },
    tabBarContentBox: {
        paddingHorizontal: 25,
        paddingBottom: 25,
        paddingTop: 10,
    },
})

export default TabBar;
