import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, Share } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import PrimaryButton from "../../../../Components/Buttons/Primary/index";

interface SentLinkProps {
    setReceiveModalVisible: (modalVisible: boolean) => void;
    receiveModalVisible: boolean;
    modalStep: number;
    setModalStep: (modalstep: number) => void;
}

const SentLink: React.FC<SentLinkProps> = ({
    receiveModalVisible,
    setModalStep,
    setReceiveModalVisible,
    modalStep,
}) => {
    const shareMessage ="https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq";

    const shareLink = async () => {
        try {
            const result = await Share.share({
                message: shareMessage,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                    setMessage(true);
                    setTimeout(() => {
                        setMessage(false);
                    }, 2000);
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log('Paylaşım hatası:', error.message);
        }
    };

    const [message, setMessage] = useState(false);

    return (
        <Modal
            style={styles.blur}
            visible={receiveModalVisible}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        {
                            message ?
                                <View style={{ position: "absolute", top: 40, width: "100%", left: 30, alignItems: "center" }}>
                                    <View style={{ borderRadius: 8, padding: 16, backgroundColor: "#222a3c", flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <Feather name="copy" size={20} color="#5F97FF" />
                                        <Text style={{ color: "#5F97FF", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Link copied to clipboard</Text>
                                    </View>
                                </View> : null
                        }


                        <View style={{ paddingVertical: 24, paddingHorizontal: 16, alignItems: "center" }}>
                            <AntDesign name="link" size={60} color="white" style={{ paddingBottom: 16 }} />
                            <Text style={{ color: "white", fontSize: 18, lineHeight: 28, fontFamily: "Poppins_500Medium" }}>Send Link</Text>
                            <Text style={{ color: "#ABAFC4", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", textAlign: "center", paddingBottom: 32 }}>Your request link is already to send!
                                Send this link to a friend, and it will ask them to send 0.0001 ETH</Text>
                        </View>
                        <Text style={{ color: "#5F97FF", fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", textAlign: "center", paddingBottom: 200 }}>https://dege.app.link/send/0xBBB6A12945 aC14C84185a17C6BD2eAe96e/value=21jq</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 40, paddingVertical: 40 }}>
                            <Pressable onPress={() => {
                                setMessage(true)
                                shareLink();
                                setTimeout(() => {
                                    setMessage(false)
                                }, 2000);
                            }}>
                                <Text style={{ color: "#FEBF32", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Copy Link</Text>
                            </Pressable>
                            <Pressable onPress={()=> 
                                {
                                    setModalStep(modalStep + 1)
                                    setTimeout(() => {
                                        setReceiveModalVisible(false)
                                        setModalStep(0)
                                    }, 5100);
                                }
                            }>
                                <Text style={{ color: "#FEBF32", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>Qr code</Text>
                            </Pressable>
                        </View>



                        <PrimaryButton
                            text="Send Link "
                            onPress={() => {
                                setTimeout(() => {
                                    setReceiveModalVisible(false);
                                    shareLink();
                                    setModalStep(1)
                                }, 2500);
                            }}
                        />
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 42,
        lineHeight: 56,
        color: 'transparent',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: 56,
    },
    overlayText: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
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
        paddingTop: 100,
        paddingHorizontal: 24,
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

export default SentLink;
