import { BlurView } from "expo-blur";
import React from "react";
import { Modal, View, Pressable, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

interface GeneralProps {
    setGeneralModal: (generalModal: boolean) => void;
    generalModal: boolean;
}

interface RadioButtonProps {
    selected: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected }) => (
    <View
        style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: selected ? '#FEBF32' : '#ABAFC4',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        {selected ? (
            <View
                style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#FEBF32',
                }}
            />
        ) : null}
    </View>
);

const General: React.FC<GeneralProps> = ({
    setGeneralModal,
    generalModal,
}) => {

    const navigation = useNavigation();
    const [selected, setSelected] = React.useState('Native');

    return (
        <Modal
            visible={generalModal}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 30 }}>
                            <Text style={styles.modalText}>General</Text>
                            <Pressable onPress={() => { setGeneralModal(false); navigation.navigate("Onboarding", { screen: "Preferences" }) }} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                            <Pressable onPress={() => {
                                navigation.navigate("Onboarding", { screen: "Preferences" })
                            }} style={{ position: "absolute", top: "25%", left: 0 }}>
                                <AntDesign name="left" size={18} color="white" />
                            </Pressable>
                        </View>
                        <ScrollView style={{ maxHeight: 700 }}>
                            <View style={{ gap: 40 }}>
                            <View style={{ gap: 8 }}>
                                <Text style={styles.contentTitle}>Currency Conversion</Text>
                                <Text style={styles.contentText}>Display fiat values in using o specific currency throughout the application</Text>
                                <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: "#2a2d3c" }}>
                                    <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>USD - United State Dollar</Text>
                                    <AntDesign name='down' size={14} color={"white"} />
                                </View>
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={styles.contentTitle}>Privacy Currency</Text>
                                <Text style={styles.contentText}>
                                    Select Native to prioritize displaying values in the native currency of the chain (e.g. ETH). Select Fiat to prioritize displaying values in your selected fiat currency
                                </Text>
                                <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                                        <Pressable
                                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                            onPress={() => setSelected('Native')}
                                        >
                                            <RadioButton selected={selected === 'Native'} />
                                            <Text style={{ marginLeft: 8, fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Native</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                            onPress={() => setSelected('Fiat')}
                                        >
                                            <RadioButton selected={selected === 'Fiat'} />
                                            <Text style={{ marginLeft: 8, fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Fiat</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            <View style={{ gap: 8 }}>
                                <Text style={styles.contentTitle}>Current Language</Text>
                                <Text style={styles.contentText}>Translate the application to a different supported language</Text>
                                <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: "#2a2d3c" }}>
                                    <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>English</Text>
                                    <AntDesign name='down' size={14} color={"white"} />
                                </View>
                            </View>
                            <View style={{ gap: 8 }}>
                                <Text style={styles.contentTitle}>Search Engine</Text>
                                <Text style={styles.contentText}>Display fiat values in using o specific currency throughout the application</Text>
                                <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: "#2a2d3c" }}>
                                    <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>USD - United State Dollar</Text>
                                    <AntDesign name='down' size={14} color={"white"} />
                                </View>
                            </View>
                            <View style={{ gap: 8, paddingBottom: 66 }}>
                                <Text style={styles.contentTitle}>Account Identicon</Text>
                                <Text style={styles.contentText}>You can customize your account</Text>
                                <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: "#2a2d3c" }}>
                                    <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>Custom Account</Text>
                                    <AntDesign name='down' size={14} color={"white"} />
                                </View>
                            </View>
                            </View>
                           

                        </ScrollView>
                    </View>

                </View>

            </BlurView>
        </Modal >
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

export default General;
