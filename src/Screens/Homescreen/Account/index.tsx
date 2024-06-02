import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from "expo-blur";
import User1 from '../../../../assets/images/User-1.svg'
import { AntDesign } from '@expo/vector-icons';
import SwapShape from "../../../../assets/images/SwapShape.svg";
import NewAccountuser from "../../../../assets/images/NewAccountAvatar.svg";
import PrimaryButton from "../../../Components/Buttons/Primary";
import { MainContext } from "../../../Context";

const Account = () => {
    const font = "Poppins_500Medium";
    const { accounts, setAccounts } = useContext(MainContext);


    const [modalVisible, setModalVisible] = useState(false);
    let [user, setUser] = useState({
        id: 1,
        name: "Account 1",
        balance: 9.2362,
        avatar: <User1 />
    });
    const [modalStep, setModalStep] = useState("Account");
    const [newAccount, setNewAccount] = useState("");

    const handleChangeNewUser = () => {
        let newUser = {
            id: accounts.length + 1,
            name: newAccount,
            balance: 0,
            avatar: <NewAccountuser />
        };

        setAccounts([...accounts, newUser]);
        setNewAccount("");
        setModalStep("Account");
        setModalVisible(false);
    };

    const handleNewAccountChange = (text: string) => {
        setNewAccount(text);
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ paddingVertical: 4, paddingRight: 8, position: "relative" }}>
                <View style={styles.iconContainer}>
                    {user.avatar}
                </View>
                <SwapShape style={{ position: "absolute", bottom: 4, right: 0 }} />
            </Pressable>

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
                            {modalStep === "Account" ?
                                <>
                                    <Text style={styles.modalText}>Account</Text>
                                    <View style={{ paddingBottom: 24 }}>
                                        {accounts.map((account) =>
                                            <Pressable key={account.id} onPress={() => {
                                                setUser({ id: account.id, name: account.name, avatar: account.avatar, balance: account.balance });
                                                setModalVisible(false);
                                            }} style={styles.account}>
                                                <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ paddingVertical: 4, paddingRight: 8, position: "relative" }}>
                                                        <View style={styles.iconContainer}>
                                                            {account.avatar}
                                                        </View>
                                                    </View>
                                                    <View style={{ gap: 1 }}>
                                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: font, color: "white" }}>
                                                            {account.name}
                                                        </Text>
                                                        <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: font, color: "#ABAFC4" }}>
                                                            {account.balance} ETH
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )}
                                        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 12 }}>
                                            <Pressable onPress={() => setModalStep("Create New Account")}>
                                                <Text style={{ color: "#FEBF32", fontFamily: "Poppins_700Bold" }}>Create New Account</Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Pressable onPress={() => setModalStep("Import Account")}>
                                                <Text style={{ color: "#FEBF32", fontFamily: "Poppins_700Bold", paddingVertical: 12 }}>Import Account</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </>
                                : modalStep === "Create New Account" ?
                                    <>
                                        <View style={{ alignItems: "center", position: "relative", paddingBottom: 0 }}>
                                            <Pressable onPress={() => setModalStep("Account")} style={{ position: "absolute", top: "30%", left: 5 }}>
                                                <AntDesign name="left" size={16} color="white" />
                                            </Pressable>
                                            <Text style={[styles.modalText, { paddingBottom: 40 }]}>Create New Account</Text>
                                        </View>
                                        <View style={{ alignItems: "center", paddingBottom: 40, gap: 24 }}>
                                            <View style={{ paddingLeft: 5, position: "relative", alignItems: "center" }}>
                                                <View style={{ backgroundColor: "#222531", borderRadius: 100, width: 64, height: 64 }}>
                                                    <NewAccountuser />
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 16, paddingVertical: 4, backgroundColor: "#2A2D3C", borderRadius: 6 }}>
                                                <Text style={{ fontFamily: "Poppins_500Medium", color: "#FEBF32" }}>Choose an icon</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderWidth: 2, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, borderColor: "#2A2D3C" }}>
                                            <View style={{ alignItems: "flex-start" }}>
                                                <Text style={{ color: "#888DAA", fontFamily: "Poppins_500Medium", fontSize: 12, lineHeight: 16 }}>Account Name</Text>
                                                <TextInput
                                                    style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 14, lineHeight: 24, textAlign: "left", width: "80%" }}
                                                    onChangeText={handleNewAccountChange}
                                                    value={newAccount}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 70 }}>
                                            <PrimaryButton text="Create" onPress={handleChangeNewUser} disabled={newAccount === ""} />
                                        </View>
                                    </>
                                    : modalStep === "Import Account" ?
                                        <>
                                            <View style={{ alignItems: "center", position: "relative", paddingBottom: 0 }}>
                                                <Pressable onPress={() => setModalStep("Account")} style={{ position: "absolute", top: "30%", left: 5 }}>
                                                    <AntDesign name="left" size={16} color="white" />
                                                </Pressable>
                                                <Text style={[styles.modalText, { paddingBottom: 40 }]}>Import Account</Text>
                                            </View>
                                            <View style={{ gap: 2, paddingBottom: 24 }}>
                                                <Text style={{ color: "white", fontSize: 14, lineHeight: 22, fontFamily: "Poppins_500Medium" }}>Imported accounts are viewable in your wallet but are not recoverable with your DeGe seed phrase.</Text>
                                                <Text style={{ color: "white", fontSize: 14, lineHeight: 22, fontFamily: "Poppins_500Medium" }}>Learn more about imported accounts here.
                                                    USD Coin</Text>
                                            </View>
                                            <Text style={{ color: "white", fontSize: 14, lineHeight: 22, fontFamily: "Poppins_700Bold", paddingBottom: 16 }}>Paste youur private key string</Text>
                                            <TextInput style={{ borderWidth: 2, borderColor: "#2A2D3C", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 20 }} placeholder="e.g
4395a2a6349e069ab44043f01d77cf7b91822b1841e333128d98f7878495bf53" placeholderTextColor={"#888DAA"} multiline={true}
                                                numberOfLines={4} />

                                            <View style={styles.buttonContainer}>
                                                <Pressable onPress={() => {
                                                    setModalVisible(false);

                                                }}>
                                                    <Text style={{ fontSize: 16, fontFamily: font, lineHeight: 24, fontWeight: "bold", color: "#FEBF32", paddingHorizontal: 30 }}>Scan a QR code</Text>
                                                </Pressable>
                                                <View style={{ width: "48%" }}>
                                                    <PrimaryButton text="Import Account" onPress={() => setModalVisible(false)} />

                                                </View>
                                            </View>
                                        </> : null


                            }
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 60
    },
    account: {
        padding: 16,
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 40,
        paddingHorizontal: 24
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
    iconContainer: {
        backgroundColor: "#222531",
        overflow: "hidden",
        width: 40,
        height: 40,
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

export default Account;
