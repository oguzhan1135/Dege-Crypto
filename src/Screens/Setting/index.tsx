import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Share } from 'react-native';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppNavigation } from '../../Router/useAppNavigation';
import HomeShape from '../../../assets/images/HomeShape.svg';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TabBar from '../../Components/TabBar';
const Setting = () => {

    const navigation = useAppNavigation();
    const shareMessage = "https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq";
    const shareLink = async () => {
        try {
            const result = await Share.share({
                message: shareMessage,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log('Paylaşım hatası:', error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <HomeShape style={{ position: "absolute", right: 0, top: "5%", transform: [{ scale: 1 }] }} />
                <View style={{ alignItems: "center", paddingBottom: 0 }}>
                    <Text style={styles.text}>Settings</Text>
                </View>
                <View style={{ gap: 8 }}>
                    <BlurView intensity={10} style={{ padding: 0 }}>
                        <View style={styles.listItem}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                                <FontAwesome name="user-circle-o" size={24} color="white" />
                                <Text style={styles.text}>Account</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="white" />
                        </View>
                    </BlurView>

                    <Pressable onPress={() => shareLink()} style={styles.listItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <AntDesign name="sharealt" size={24} color="white" />
                            <Text style={styles.text}>Share My Public Address</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </Pressable>

                    <View style={styles.listItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Entypo name="eye" size={24} color="white" />
                            <Text style={styles.text}>View on Etherscan</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </View>

                    <Pressable onPress={() => {
                        navigation.navigate("Onboarding", { screen: "Preferences" });
                    }} style={styles.listItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <AntDesign name="setting" size={24} color="white" />
                            <Text style={styles.text}>Preferences</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </Pressable>

                    <View style={styles.listItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <FontAwesome5 name="headset" size={24} color="white" />
                            <Text style={styles.text}>Get Help</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </View>

                    <View style={styles.listItem}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <AntDesign name="message1" size={24} color="white" />
                            <Text style={styles.text}>Send Feed back</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </View>

                    <View style={[styles.listItem, { paddingTop: 100 }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <MaterialIcons name="logout" size={24} color="white" />
                            <Text style={styles.text}>Logout</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="white" />
                    </View>
                </View>
            </View >
            <TabBar />

        </>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 100,
        paddingBottom: 40,
        gap: 24,
        position: "relative",
        paddingHorizontal: 24
    },
    text: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        lineHeight: 24,
        color: "white"
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 8
    }
});

export default Setting;
