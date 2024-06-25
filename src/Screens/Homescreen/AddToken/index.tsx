import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import WyreCard from "../../../../assets/images/WyreCard.svg"
import { Feather } from '@expo/vector-icons';
import PrimaryButton from "../../../Components/Buttons/Primary";
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
    const [selectToken, setSelectToken] = useState("BUSD")

    return (
        <Modal
            style={styles.blur}
            visible={addTokenModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
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
                                </View>
                            </View>
                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_700Bold" }}>Select Token</Text>
                            <View style={{ gap: 8,paddingBottom:80}}>
                                <Pressable onPress={() => setSelectToken("BNB")} style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                        <View style={{ backgroundColor: "#44485F", padding: 20, borderRadius: 100 }} />
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Binance Coin</Text><Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>(BNB)</Text>
                                        </View>
                                    </View>
                                </Pressable>
                                <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                        <View style={{ backgroundColor: "#44485F", padding: 20, borderRadius: 100 }} />
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Binance USD</Text>
                                            <Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>(BUSD)</Text>
                                        </View>
                                    </View>
                                    <AntDesign name="checkcircleo" size={24} color="#76E268" />
                                </View>
                                <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                        <View style={{ backgroundColor: "#44485F", padding: 20, borderRadius: 100 }} />
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>BIDR</Text>
                                            <Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>(BIDR)</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                        <View style={{ backgroundColor: "#44485F", padding: 20, borderRadius: 100 }} />
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Binance KRW</Text>
                                            <Text style={{ color: "#ABAFC4", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>(BKRW)</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable style={{ width: "48%" }} onPress={() => {setAddTokenModal(false)
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, fontWeight: "bold", color: "#FEBF32", textAlign: "center" }}>Cancel</Text>
                            </Pressable>
                            <View style={{ width: "48%" }}>
                                <PrimaryButton
                                    text="Add Token"
                                    onPress={() => {
                                        setAddTokenModal(false)
                                    }}
                                />
                            </View>
                        </View>


                    </View>
                </View>
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
