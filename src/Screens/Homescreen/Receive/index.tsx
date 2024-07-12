import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Pressable, Share } from "react-native";
import QrCode from '../../../../assets/images/qr-doge.svg'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from "../../../Components/Buttons/Primary";
import Amount from "../Receive/Amount";
import SentLink from "./SentLink";
import QrCodeModal from "./QrCode";
import * as Clipboard from 'expo-clipboard';
interface ReceiveProp {
    receiveModal: boolean;
    setReceiveModal: (receiveModal: boolean) => void;
}

const Receive: React.FC<ReceiveProp> = ({ receiveModal, setReceiveModal }) => {
    const [modalStep, setModalStep] = useState<number>(0);
    const [receiveModalVisible, setReceiveModalVisible] = useState<boolean>(true)
    const [message, setMessage] = useState(false);

    const copyAddress = async () => {
        await Clipboard.setStringAsync('0x3Dc6...DfCE');
    };
    const shareMessage = "https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq";

    const shareLink = async () => {
        try {
            const result = await Share.share({
                message: shareMessage,
            });
        } catch (error) {
            console.log('Paylaşım hatası:', error);
        }
    };
    return (
        <Modal
            visible={receiveModal}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView]}>
                        <View style={{ paddingBottom: 30 }}>
                            <Text style={{textAlign:"center", color:"white",fontSize:16, lineHeight:24, fontFamily:"Poppins_500Medium"}}>Receive</Text>
                            <Pressable onPress={() => setReceiveModal(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            
                        </View>
                        <View style={{ alignItems: "center" }}>

                            <QrCode style={{ marginBottom: 24 }} />
                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", paddingBottom: 24 }}>Scan address to Receive payment</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 40 }}>
                                <View style={{ borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#2A2D3C" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <Text style={{ color: "#FEBF32", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>0x3Dc6...DfCE</Text>
                                        <Pressable onPress={() => copyAddress()}>
                                            <Feather name="copy" size={20} color="#FEBF32" />
                                        </Pressable>

                                    </View>
                                </View>
                                <Pressable onPress={() => shareLink()} style={{ borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: "#2A2D3C" }}>
                                    <AntDesign name="sharealt" size={20} color="#FEBF32" />
                                </Pressable>

                            </View>

                        </View>
                        <PrimaryButton text="Request Payment" onPress={() => setModalStep(1)} />
                    </View>

                    {
                        modalStep === 1 ?
                            <Amount
                                receiveModalVisible={receiveModalVisible}
                                setReceiveModalVisible={setReceiveModal}
                                modalStep={modalStep}
                                setModalStep={setModalStep}
                            /> :
                            modalStep === 2 ?
                                <SentLink

                                    receiveModalVisible={receiveModalVisible}
                                    setReceiveModalVisible={setReceiveModal}
                                    modalStep={modalStep}
                                    setModalStep={setModalStep} />

                                : modalStep === 3 ?
                                    <QrCodeModal
                                        receiveModalVisible={receiveModalVisible}
                                        setReceiveModalVisible={setReceiveModal}
                                        modalStep={modalStep}
                                        setModalStep={setModalStep}
                                    /> : null



                    }
                </View>

            </BlurView>

        </Modal>
    )
}
const styles = StyleSheet.create({
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 40,
        paddingHorizontal: 24,
        paddingTop: 24
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgb(0,0,0,10)',
    },
})
export default Receive