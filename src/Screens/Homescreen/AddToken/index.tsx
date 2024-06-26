import { BlurView } from "expo-blur";
import React, { useContext, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../Components/Buttons/Primary";
import { MainContext } from "../../../Context";

interface AddTokenProps {
    setAddTokenModal: (buyModal: boolean) => void;
    addTokenModal: boolean;
}

const AddTokenModal: React.FC<AddTokenProps> = ({
    addTokenModal,
    setAddTokenModal,
}) => {

    const [activeTab, setActiveTab] = useState('Search');
    const [token, setToken] = useState("");
    const [selectToken, setSelectToken] = useState("");
    const { coinList, setCoinList, sentAccount, setSentAccount } = useContext(MainContext)
    const [tokens, setTokens] = useState([
        {
            id: 30,
            coinName: "Binance USD",
            currency: "BUSD",
            rate: 205.22,
            onTheRise: true,
            percent: 1.9
        },
        {
            id: 31,
            coinName: "BIDR",
            currency: "BIDR",
            rate: 199.22,
            onTheRise: false,
            percent: 0.12
        },
        {
            id: 30,
            coinName: "Binance KRW",
            currency: "BKRW",
            rate: 295.01,
            onTheRise: true,
            percent: 11
        }
    ]);

    const filteredTokens = tokens.filter(t =>
        t.coinName.toLowerCase().includes(token.toLowerCase()) ||
        t.currency.toLowerCase().includes(token.toLowerCase())
    );

    const addToken = () => {
        let selectedToken = tokens.find((token) => token.currency === selectToken);

        if (selectedToken) {
            const newToken = {
                id: coinList.length + 1,
                coinName: selectedToken.coinName,
                currency: selectedToken.currency,
                rate: selectedToken.rate,
                onTheRise: selectedToken.onTheRise,
                percent: selectedToken.percent,
            };

            setCoinList([...coinList, newToken]);

            setSentAccount({
                ...sentAccount,
                balance: [
                    ...sentAccount.balance,
                    {
                        balance: 0,
                        coinName: selectedToken.currency,
                    }
                ]
            });

            setTokens(tokens.filter((token) => token.currency !== selectToken));
            setSelectToken("");
            setToken("");
        }
    };

    return (
        <Modal
            style={styles.blur}
            visible={addTokenModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.centeredView}>
                            <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                            <View style={[styles.modalView, { position: "relative" }]}>
                                <View style={{ paddingBottom: 0 }}>
                                    <Text style={styles.modalText}>Add Asset</Text>
                                    <Pressable onPress={() => setAddTokenModal(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                        <AntDesign name="close" size={18} color="white" />
                                    </Pressable>
                                </View>
                                <View style={{ gap: 24 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
                                        <Pressable onPress={() => setActiveTab('Search')} style={activeTab === 'Search' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                                            <Text style={{ color: activeTab === 'Search' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Search</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setActiveTab('Custom Token')} style={activeTab === 'Custom Token' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                                            <Text style={{ color: activeTab === 'Custom Token' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Custom Token</Text>
                                        </Pressable>
                                    </View>

                                    {
                                        activeTab === "Search" ?
                                            <>
                                                <View style={{ paddingVertical: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8 }}>
                                                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                                            <AntDesign name="search1" size={20} color="white" style={{ padding: 2 }} />
                                                            <TextInput
                                                                placeholder="Search..."
                                                                placeholderTextColor="#ABAFC4"
                                                                style={{ color: "white", textAlignVertical: "center" }}
                                                                value={token}
                                                                onChangeText={setToken}
                                                                scrollEnabled={false}
                                                                multiline
                                                            />
                                                        </View>
                                                        <Pressable onPress={() => setToken("")}>
                                                            <AntDesign name="close" size={20} color="white" />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                                <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_700Bold" }}>Select Token</Text>
                                                <ScrollView style={{ gap: 8, paddingBottom: 80, maxHeight: 250 }}>
                                                    {token === "" ? null : (
                                                        filteredTokens.map((token, index) => (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => setSelectToken(token.currency)}
                                                                style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}
                                                            >
                                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                                    <View style={{ backgroundColor: "#44485F", padding: 20, borderRadius: 100 }} />
                                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                                                        <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{token.coinName}</Text>
                                                                        <Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>({token.currency})</Text>
                                                                    </View>
                                                                </View>
                                                                {selectToken === token.currency && <AntDesign name="checkcircleo" size={24} color="#76E268" />}
                                                            </Pressable>
                                                        ))
                                                    )}
                                                </ScrollView>
                                            </>
                                            :
                                            <View style={{ gap: 24, paddingBottom: 270 }}>
                                                <View style={{ paddingVertical: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8 }}>
                                                    <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_700Bold" }}>Token Adress</Text>

                                                </View>
                                                <View style={{ paddingVertical: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8 }}>
                                                    <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_700Bold" }}>Token Symbol</Text>

                                                </View>
                                                <View style={{ paddingVertical: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: "#2a2d3c", borderRadius: 8 }}>
                                                    <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_700Bold" }}>Token of Precision</Text>

                                                </View>
                                            </View>
                                    }

                                </View>
                                <View style={styles.buttonContainer}>
                                    <Pressable style={{ width: "48%" }} onPress={() => {
                                        setAddTokenModal(false);
                                    }}>
                                        <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Cancel</Text>
                                    </Pressable>
                                    <View style={{ width: "48%" }}>
                                        <PrimaryButton
                                            text="Add Token"
                                            onPress={() => {
                                                setAddTokenModal(false);
                                                addToken();
                                            }}
                                            disabled={selectToken === "" ? true : false}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 32
    },
    tabButtonActive: {
        paddingHorizontal: 16,
        paddingVertical: 0,
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    tabButtonDeactive: {
        paddingHorizontal: 16,
        paddingVertical: 8,
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
        paddingTop: 16,
        paddingHorizontal: 24,
        paddingBottom: 40
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontFamily: "Poppins_500Medium",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 24,
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
});

export default AddTokenModal;
