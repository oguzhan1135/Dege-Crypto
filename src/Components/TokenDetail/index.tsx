import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../Router/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppNavigation } from '../../Router/useAppNavigation';
import { AntDesign } from '@expo/vector-icons';
import GradiantText from '../GradiantText';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';import HomeShape from '../../../assets/images/HomeShape.svg'

type TokenDetailProps = NativeStackScreenProps<OnboardingStackParamList, 'TokenDetail'>;

const TokenDetail: React.FC<TokenDetailProps> = ({ route }) => {
    const { balance, currency, rate } = route.params;
    const [activeTab, setActiveTab] = React.useState("wallet");
    const navigation = useAppNavigation()
    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };    return (
        <View style={styles.container}>
            <HomeShape style={{ position: "absolute", right: 0, top: "15%", transform: [{ scale: 1.2 }] }} />
            <View style={styles.navbar}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Onboarding", {
                            screen: 'Homescreen',
                        })
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
                    <Text style={styles.navbarText}>{currency}</Text>
                </View>

            </View>

            <View style={styles.aset}>
                <GradiantText text={`${balance} ${currency}`} row={1} lineHeight={56} fontSize={40} width={300} />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>${rate * balance}</Text>
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

            </View>
            <View style={{ paddingHorizontal: 24,gap:8 }}>
                <View style={styles.listItem}>
                    <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Mar 3 at 10:04am</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="arrowdown" size={24} style={{ paddingHorizontal: 5 }} color="#76E268" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex:1 }}>
                            <View style={{ flexDirection: "column",gap:4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>Received {currency}</Text>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>0.04 {currency}</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>$9.58799</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Mar 3 at 10:04am</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="arrowup" size={24} style={{ paddingHorizontal: 5 }} color="#EA3943" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex:1 }}>
                        <View style={{ flexDirection: "column",gap:4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>Sent {currency}</Text>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#EA3943" }}>Cancelled</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>2.35 {currency}</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>$547.5265</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Mar 3 at 10:04am</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="arrowdown" size={24} style={{ paddingHorizontal: 5 }} color="#76E268" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex:1 }}>
                        <View style={{ flexDirection: "column",gap:4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>Received {currency}</Text>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>1.876 {currency}</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>$436.11371</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>Mar 3 at 10:04am</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="arrowdown" size={24} style={{ paddingHorizontal: 5 }} color="#76E268" />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex:1 }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>Received {currency}</Text>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, lineHeight: 24, color: "#76E268" }}>Confirmed</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, lineHeight: 24, color: "white" }}>0.04 {currency}</Text>
                                <Text style={{ color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium" }}>$9.58799</Text>
                            </View>
                        </View>
                    </View>
                </View>
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
