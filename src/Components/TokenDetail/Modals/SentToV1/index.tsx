import { BlurView } from "expo-blur";
import React, { useContext } from "react";
import { Modal, View, Pressable, TextInput, Text, StyleSheet } from "react-native";
import Account from "../../Account";
import { Accounts, Recent } from "../../../../Router/types";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import User1 from "../../../../../assets/images/User-1.svg"
import PrimaryButton from "../../../Buttons/Primary";
import { MainContext } from "../../../../Context";

interface SenToProps {
    setSentModalVisible: (modalVisible: boolean) => void;
    sentModalVisible: boolean;
    currency: string;
    paymentTo?: Recent;
    setPaymentTo: (paymentTo: Recent) => void;
    recent: Recent[];
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const SentToV1: React.FC<SenToProps> = (
    {
        sentModalVisible,
        setModalStep,
        setSentModalVisible,
        setPaymentTo,
        paymentTo,
        recent,
        currency,
        modalStep,
    }) => {
        const {setReceiverAccount}=useContext(MainContext)

    return (
        <Modal
            style={styles.blur}
            visible={sentModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 32 }}>
                            <Text style={styles.modalText}>Sent To</Text>
                            <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ gap: 8 }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>From</Text>
                                <Account currency={currency} />
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>To</Text>
                                {
                                    paymentTo?.adress === "" ?
                                        <View style={{ borderWidth: 2, borderColor: "#242424", borderRadius: 8, padding: 16, flexDirection: "row", alignItems: "center", gap: 20, }}>
                                            <TextInput style={{ color: "white", width: "87%" }} value={paymentTo?.adress} placeholderTextColor={"#888DAA"} placeholder='Search, public address (0x), or ENS' />
                                            <MaterialCommunityIcons style={{ paddingRight: 19, }} name="line-scan" size={24} color="white" />

                                        </View> :
                                        <View style={{ alignItems: "center", flexDirection: "row", padding: 16, justifyContent: "space-between" }}>
                                            <View style={{ alignItems: "center", flexDirection: "row", gap: 8, }}>
                                                <View style={styles.iconContainer}>
                                                    {paymentTo?.avatar}
                                                </View>
                                                <View style={{ gap: 4 }}>
                                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                                        {paymentTo?.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>
                                                        {paymentTo?.adress}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Pressable onPress={() => setPaymentTo({ id: 1, adress: "", avatar: <User1 />, name: "" })}>
                                                <AntDesign name="close" size={20} color={"white"} />
                                            </Pressable>

                                        </View>
                                }

                            </View>
                        </View>

                        {
                            paymentTo?.adress === "" ?
                                <View>
                                    <Text style={{ color: "#5F97FF", paddingVertical: 24, lineHeight: 24, fontSize: 14, fontFamily: "Poppins_500Medium" }}>Transfer Between My Accounts</Text>
                                    <View style={{ paddingBottom: 80 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>Recent</Text>
                                        {
                                            recent.map((recent) =>
                                                <Pressable onPress={() => {
                                                    setPaymentTo({ id: 1, adress: recent.adress, avatar: recent.avatar, name: recent.name })
                                                    setReceiverAccount({ id: 1, adress: recent.adress, avatar: recent.avatar, name: recent.name })
                                                }

                                                } style={{ alignItems: "center", flexDirection: "row", gap: 8, padding: 16 }}>
                                                    <View style={styles.iconContainer}>
                                                        {recent.avatar}
                                                    </View>
                                                    <View style={{ gap: 4 }}>
                                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                                            {recent.name}
                                                        </Text>
                                                        <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>
                                                            {recent.adress}
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }

                                    </View>
                                </View> :
                                <View style={{ paddingTop: 360 }}>
                                    <PrimaryButton text="Next" onPress={() => setModalStep(modalStep + 1)} />
                                </View>
                        }




                    </View>
                </View>
            </BlurView>
        </Modal>
    )

}
const styles = StyleSheet.create({
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
export default SentToV1