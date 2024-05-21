import React from "react";
import { View, StyleSheet, Text } from "react-native";
import User1 from '../../../assets/images/User-1.svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradiantText from "../../Components/GradiantText";
import AntDesign from '@expo/vector-icons/AntDesign';
import HBomeShape from "../../../assets/images/HomeShape.svg"

const Homescreen = () => {
    return (
        <View style={styles.container}>
            <HBomeShape style={{ position: "absolute", right: 0, top: "1%", transform: [{ scale: 1.5 }] }} />
            <View style={styles.navbar}>
                <View style={styles.leftSection}>
                    <View style={styles.iconContainer}>
                        <User1 style={styles.icon} />
                    </View>
                </View>
                <View style={styles.centerSection}>
                    <View style={styles.networkButton}>
                        <Text style={styles.networkButtonText}>Etherium Main</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={16} color="white" />
                    </View>
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
            <View style={{ flexDirection: "row", alignItems: "center",gap:24 }}>
                <View style={styles.tabButtonActive}>
                    <Text style={{color:"white",fontFamily:"Poppins_500Medium"}}>Token</Text>
                </View>
                <View style={styles.tabButtonDeactive}>
                <Text style={{color:"#888DAA",fontFamily:"Poppins_500Medium"}}>Collectibles</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        alignItems: "center"
    },
    aset: {
        gap: 8,
        justifyContent: "flex-start"
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16

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
        paddingHorizontal: 24,
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
    networkButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 12,
    },
    networkButtonText: {
        color: "white",
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "Poppins_500Medium"
    },
});

export default Homescreen;
