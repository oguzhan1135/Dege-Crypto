import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../../../Components/Buttons/Primary";
import SecondaryButton from "../../../../../Components/Buttons/Secondary";
import RevalSeed from "./SecurityModals/RevalSeedPhrase";
import AutoLock from "./SecurityModals/AutoLock";
import { useAppNavigation } from "../../../../../Router/useAppNavigation";


interface SecurityProps {
    setSecurityModal: (securityModal: boolean) => void;
    securityModal: boolean;
}



const Security: React.FC<SecurityProps> = ({
    setSecurityModal,
    securityModal,
}) => {

    const navigation = useAppNavigation();
    const [faceId, setFaceId] = useState(true)
    const [privacy, setPrivacy] = useState(true)
    const [metaMetrics, setMetaMetrics] = useState(false)
    const [trasaction, setTransaction] = useState(true);
    const [revalSeedModal, setRevalSeedModal] = useState(false)
    const [lockTime, setLockTime] = useState("After 30 seconds");
    const [autoLockModal, setAutoLockModal] = useState(false)

    const onchangeAutoLock = (tiime: string) => {
        setLockTime(tiime)
    }



    return (
        <Modal
            visible={securityModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Security & Privacy</Text>
                            <Pressable onPress={() => { setSecurityModal(false); navigation.navigate("Onboarding", { screen: "Preferences" }) }} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => {
                               setSecurityModal(false);
                            }} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>
                        <ScrollView style={{ maxHeight: 700 }}>
                            <View style={{ gap: 40 }}>
                                <View style={{ gap: 24 }}>
                                    <Text style={styles.contentTitle}>Security</Text>
                                    <View style={{ gap: 8 }}>
                                        <Text style={styles.contentTitle}>Protech Your Wallet</Text>
                                        <Text style={[styles.contentText, { paddingBottom: 8 }]}>Display fiat values in using o specific currency throughout the application</Text>
                                        <View style={{ borderRadius: 100, paddingVertical: 6, paddingHorizontal: 8, backgroundColor: "#1a2829", flexDirection: "row", alignItems: "center", gap: 6, width: 184 }}>
                                            <AntDesign name="checkcircleo" size={16} color="#76E268" />
                                            <Text style={{ color: "#76E268", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 16 }}>Seed phrase backed up</Text>
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Pressable style={{ width: "40%" }} onPress={() => {

                                        }}>
                                            <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Backup</Text>
                                        </Pressable>
                                        <View style={{ width: "60%" }}>

                                            <PrimaryButton
                                                text="Reveal Seed Phrase"
                                                onPress={() => {
                                                    setRevalSeedModal(true)
                                                }}
                                            />

                                        </View>
                                        <RevalSeed
                                            setRevalSeedModal={setRevalSeedModal}
                                            revalSeedModal={revalSeedModal}
                                        />
                                    </View>

                                </View>
                                <View style={{ gap: 24 }}>
                                    <View style={{ gap: 8 }}>
                                        <Text style={styles.contentTitle}>Protech Your Wallet</Text>
                                        <Text style={[styles.contentText, { paddingBottom: 8 }]}>Display fiat values in using o specific currency throughout the application</Text>
                                    </View>
                                    <Pressable style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Change Password</Text>
                                    </Pressable>
                                </View>
                                <View style={{ gap: 24 }}>
                                    <View style={{ gap: 8 }}>
                                        <Text style={styles.contentTitle}>Auto-Lock</Text>
                                        <Text style={[styles.contentText, { paddingBottom: 8 }]}>Choose the amount of time before the application automatically locks</Text>
                                    </View>
                                    <Pressable onPress={() => setAutoLockModal(true)} style={{ borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: "#2a2d3c" }}>
                                        <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{lockTime}</Text>
                                        <AntDesign name='down' size={14} color={"white"} />
                                    </Pressable>
                                    <AutoLock
                                        onChangeAutoLock={onchangeAutoLock}
                                        setAutoLockModal={setAutoLockModal}
                                        autoLockModal={autoLockModal}
                                    />
                                </View>
                                <View style={{ gap: 24 }}>
                                    <View style={styles.faceIdContainer}>
                                        <Text style={{
                                            fontSize: 16, lineHeight: 24, fontWeight: "bold", color: "white", fontFamily: "Poppins_500Medium"
                                        }}>Sign in with Face ID?</Text>
                                       <Switch
                                            trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                                            thumbColor={faceId ? '#f4f3f4' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={setFaceId}
                                            value={faceId}
                                            style={{
                                                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                                borderRadius: 0
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.contentTitle}>Show Private Key for "Jersey Pinkman"</Text>
                                    <Text style={styles.contentText}>This is the private key for the current selected account: Account1. Never disclose this key. Anyone with your private key can fully control your account, including transferring away any of your funds.</Text>
                                </View>

                                <View style={{ gap: 24 }}>
                                    <View style={{ gap: 8 }}>
                                        <Text style={styles.contentTitle}>Clear Privacy Data</Text>
                                        <Text style={styles.contentText}>Clear Priacy data so all websites must request access to view account information again</Text>
                                    </View>
                                    <SecondaryButton text="Clear Privacy Data" disabled={true} />
                                </View>
                                <View style={{ gap: 8 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={styles.contentTitle}>Privacy Mode</Text>
                                        <Switch
                                            trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                                            thumbColor={privacy ? '#f4f3f4' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={setPrivacy}
                                            value={privacy}
                                            style={{
                                                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                                borderRadius: 0
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.contentText}>Website must request access to view your account information</Text>

                                </View>
                                <View style={{ gap: 8 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={styles.contentTitle}>Participate in MetaMetrics</Text>
                                        <Switch
                                            trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                                            thumbColor={metaMetrics ? '#f4f3f4' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={setMetaMetrics}
                                            value={metaMetrics}
                                            style={{
                                                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                                borderRadius: 0
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.contentText}>Participate in MetaMetrics to help us make DefiSquid better</Text>

                                </View>
                                <View style={{ gap: 8, paddingBottom: 66 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={styles.contentTitle}>Get Incoming Transactions</Text>
                                        <Switch
                                            trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                                            thumbColor={trasaction ? '#f4f3f4' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={setTransaction}
                                            value={trasaction}
                                            style={{
                                                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                                borderRadius: 0
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.contentText}>Third party APIs (Etherscan are used to show your incoming transactions in the history. Turn off if you don’t want us to pull data from those service</Text>

                                </View>
                            </View>


                        </ScrollView>
                    </View>

                </View>

            </BlurView >
        </Modal >
    )
}

const styles = StyleSheet.create({
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        borderRadius: 20,
    },
    faceIdContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: "#222531",
        overflow: "hidden",
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 0,
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
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    contentText: {
        fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#ABAFC4"
    },
    contentTitle: {
        fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white"

    }
});

export default Security;
