import { BlurView } from "expo-blur";
import React from "react";
import { View, Text, StyleSheet, Modal, Pressable, TextInput } from "react-native";
import PrimaryButton from "../../../Components/Buttons/Primary";
interface AddCollectiblesProp {
    setCollectiblesModal: (collectiblesModal: boolean) => void;
    collectiblesModal: boolean
}

const AddCollectibles: React.FC<AddCollectiblesProp> = ({ setCollectiblesModal, collectiblesModal }) => {
    return (
        <Modal
            visible={collectiblesModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 40 }}>
                            <Text style={styles.modalText}>Add Asset</Text>
                        </View>
                        <View style={{ gap: 24 }}>
                            <View style={styles.formPasswordInputContainer}>
                                <View style={styles.formPasswordInputArea}>
                                    <TextInput
                                        style={styles.formPasswordInput}
                                        placeholder='Adress'
                                        placeholderTextColor={"#888DAA"}
                                    />
                                </View>
                            </View>

                            <View style={styles.formPasswordInputContainer}>
                                <View style={styles.formPasswordInputArea}>
                                    <TextInput
                                        style={styles.formPasswordInput}
                                        placeholder='ID'
                                        placeholderTextColor={"#888DAA"}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingTop: 48 }}>
                            <PrimaryButton
                                text="Add"
                                onPress={() => setCollectiblesModal(false)}
                            />
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    formPasswordInputContainer: {
        flexDirection: "column",
        gap: 4
    },
    formPasswordInputArea: {
        height: 64,
        borderRadius: 8,
        borderColor: "#2A2D3C",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "row",
        gap: 0
    },
    formPasswordInput: {
        color: "white",
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold",
        width: "80%",
        height: 64
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 32
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
        paddingTop: 40,
        paddingBottom: 16
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
export default AddCollectibles