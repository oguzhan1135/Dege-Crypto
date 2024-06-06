import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MainContext } from "../../../../Context";
interface EditNetworkFeeProp {
    onchangeFee: (fee: number) => void;
    setModalVisible: (modalVisible: boolean) => void;
    modalVisible: boolean;
}
const EditNetworkEdit: React.FC<EditNetworkFeeProp> = ({ onchangeFee, modalVisible, setModalVisible }) => {

    const [fee, setFee] = useState<number>(0)
    const [selectedFee, setSelectedFee] = useState("Avarage")
    const [activeTab, setActiveTab] = useState('Basic');
    useEffect(() => {
        onchangeFee(fee)
    }, [fee])
    const { sentCoin, coinList } = useContext(MainContext)
    return (
        <Modal
            style={styles.blur}
            visible={modalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Edit Network Fee</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, paddingBottom: 40 }}>
                            <Pressable
                                onPress={() => setActiveTab('Basic')}
                                style={[
                                    styles.tab,
                                    activeTab === 'Basic' ? styles.activeTab : styles.inactiveTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'Basic' ? styles.activeTabText : styles.inactiveTabText,
                                    ]}
                                >
                                    Basic
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setActiveTab('Advanced')}
                                style={[
                                    styles.tab,
                                    activeTab === 'Advanced' ? styles.activeTab : styles.inactiveTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'Advanced' ? styles.activeTabText : styles.inactiveTabText,
                                    ]}
                                >
                                    Advanced
                                </Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={() => {
                            setSelectedFee("Slow")
                            setModalVisible(false)
                        }} style={{ borderWidth: 2, borderColor: "#222531", padding: 16, gap: 8, flexDirection: "row", alignItems: "center", borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth: 0 }}>
                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", width: 112 }}>Slow</Text>
                            <View style={{ gap: 8, width: 135 }}>
                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>0.08 {sentCoin?.currency}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 18, color: "#ABAFC4" }}>${coinList.find((coin) => coin.currency === sentCoin?.currency)?.rate * 0.08}</Text>
                            </View>
                            {
                                selectedFee === "Slow" ?
                                    <View style={{ alignItems: "center", marginLeft: 30 }}>
                                        <AntDesign name="checkcircleo" size={18} color="#76E268" />
                                    </View> :
                                    <View></View>}

                        </Pressable>

                        <Pressable onPress={() => {
                            setSelectedFee("Avarage")
                            setModalVisible(false)
                        }} style={{ borderWidth: 2, borderColor: "#222531", padding: 16, gap: 8, flexDirection: "row", alignItems: "center", borderBottomWidth: 0 }}>
                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", width: 112 }}>Avarage</Text>
                            <View style={{ gap: 8, width: 135 }}>
                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>0.12 {sentCoin?.currency}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 18, color: "#ABAFC4" }}>${coinList.find((coin) => coin.currency === sentCoin?.currency)?.rate * 0.12}</Text>
                            </View>
                            {
                                selectedFee === "Avarage" ?
                                    <View style={{ alignItems: "center", marginLeft: 30 }}>
                                        <AntDesign name="checkcircleo" size={18} color="#76E268" />
                                    </View> :
                                    <View></View>
                            }

                        </Pressable>
                        <Pressable onPress={() => {
                            setSelectedFee("Fast")
                            setModalVisible(false)
                        }} style={{ borderWidth: 2, borderColor: "#222531", padding: 16, gap: 8, flexDirection: "row", alignItems: "center", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                            <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", width: 112 }}>Fast</Text>
                            <View style={{ gap: 8, width: 135 }}>
                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>0.13 {sentCoin?.currency}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 18, color: "#ABAFC4" }}>${coinList.find((coin) => coin.currency === sentCoin?.currency)?.rate * 0.13}</Text>
                            </View>
                            {
                                selectedFee === "Fast" ?
                                    <View style={{ alignItems: "center", marginLeft: 30 }}>
                                        <AntDesign name="checkcircleo" size={18} color="#76E268" />
                                    </View> :
                                    <View></View>}

                        </Pressable>

                        <Pressable onPress={() => {
                            setFee(120)
                            setModalVisible(false)
                        }}><Text>Bana Bas</Text></Pressable>
                    </View>
                </View>
            </BlurView>
        </Modal >
    )
}
const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderBottomWidth: 2,
    },
    activeTab: {
        borderBottomColor: 'white',
    },
    inactiveTab: {
        borderBottomColor: 'transparent',
    },
    tabText: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins_500Medium',
    },
    activeTabText: {
        color: 'white',
    },
    inactiveTabText: {
        color: 'gray',
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
        paddingBottom: 40,
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
        backgroundColor: 'rgb(0,0,0,10)',
    }
})
export default EditNetworkEdit;