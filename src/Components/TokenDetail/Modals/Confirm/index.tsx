import { BlurView } from "expo-blur";
import React, { useContext, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../Buttons/Primary";
import GradiantText from "../../../GradiantText";
import { MainContext } from "../../../../Context";
import EditNetworkEdit from "../EditNetworkFee";

interface ConfirmProps {
    setSentModalVisible: (modalVisible: boolean) => void;
    sentModalVisible: boolean;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const Confirm: React.FC<ConfirmProps> = (
    {
        sentModalVisible,
        setModalStep,
        setSentModalVisible,
        modalStep

    }) => {
    const { receiverAccount, sentAccount, sentCoin } = useContext(MainContext)
    const font = "Poppins_500Medium";
    const [modalVisible, setModalVisible] = useState(false);
    const [editFee, setEditFee] = useState<number>()
    const onchangeFee = (fee: number) => {
        setEditFee(fee)
        console.log(fee)
    }
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
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Confirm</Text>
                            <Pressable onPress={() => setSentModalVisible(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => setModalStep(modalStep - 1)} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>

                        <View style={{ alignItems: "center", gap: 16 }}>
                            <Text style={{ color: "white", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Amount</Text>
                            <View style={{ alignItems: "center", paddingBottom: 24 }}>
                                <GradiantText text={"0.2405 BNB"} fontSize={40} lineHeight={56} width={300} row={1} />
                            </View>
                        </View>

                        <View style={{ gap: 16 }}>
                            <View>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>From</Text>
                                <View style={{ alignItems: "center", flexDirection: "row", gap: 8, padding: 16 }}>
                                    <View style={styles.iconContainer}>
                                        {sentAccount?.avatar}
                                    </View>
                                    <View style={{ gap: 4 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: font, color: "white" }}>
                                            {sentAccount?.name}
                                        </Text>
                                        <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: font, color: "#ABAFC4" }}>
                                            Balance: {sentCoin?.balance} {sentCoin?.currency}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={{ fontSize: 16, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>To</Text>

                                <View style={{ alignItems: "center", flexDirection: "row", padding: 16, justifyContent: "space-between", paddingBottom: 40 }}>
                                    <View style={{ alignItems: "center", flexDirection: "row", gap: 8, }}>
                                        <View style={styles.iconContainer}>
                                            {receiverAccount?.avatar}
                                        </View>
                                        <View style={{ gap: 4 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
                                                {receiverAccount?.name}
                                            </Text>
                                            <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", color: "#ABAFC4" }}>
                                                {receiverAccount?.adress}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingVertical: 16, gap: 8, borderRadius: 8, borderWidth: 1, borderColor: "#242424" }}>
                                    <View style={{ gap: 16 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Amount</Text>
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>{sentCoin?.amount} {sentCoin?.currency}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 2, paddingHorizontal: 16, paddingBottom: 16, borderBottomColor: "#242424" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                                                <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Network fee</Text>
                                                <Pressable onPress={() => setModalVisible(true)}>
                                                    <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#FEBF32" }}>Edit</Text>
                                                </Pressable>
                                            </View>
                                            <EditNetworkEdit
                                                setModalVisible={setModalVisible}
                                                modalVisible={modalVisible}
                                                onchangeFee={onchangeFee}
                                            />
                                            <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>0.12 {sentCoin?.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 }}>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Total Amount</Text>
                                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>

                                        </Text>

                                    </View>

                                    <Text style={{ marginLeft: "auto", color: "#ABAFC4", fontSize: 12, lineHeight: 18, fontFamily: "Poppins_500Medium", paddingHorizontal: 16 }}>
                                        qwer
                                    </Text>

                                </View>
                            </View>
                        </View>


                        <PrimaryButton text='Next' onPress={() => setSentModalVisible(false)} />

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
export default Confirm