import { useState } from "react";
import { View, Pressable, Text, StyleSheet, TextInput } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import QrCode from "../../../../../../../../../../assets/images/qr-doge.svg"

const StepTwo = () => {
    const [activeTab, setActiveTab] = useState("Text")
    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 24, paddingBottom: 24 }}>
                <Pressable onPress={() => setActiveTab('Text')} style={activeTab === 'Text' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                    <Text style={{ color: activeTab === 'Text' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Text</Text>
                </Pressable>
                <Pressable onPress={() => setActiveTab('Qr Code')} style={activeTab === 'Qr Code' ? styles.tabButtonActive : styles.tabButtonDeactive}>
                    <Text style={{ color: activeTab === 'Qr Code' ? "white" : "#888DAA", fontFamily: "Poppins_500Medium" }}>Qr Code</Text>
                </Pressable>
            </View>
            {
                activeTab === "Text" ?
                    <>
                        <View style={{ borderWidth: 1, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, paddingBottom: 24 }}>
                            <TextInput
                                placeholder="Enter seed phrase to continue"
                                multiline
                                style={{ color: "white", fontFamily: "Poppins_500Medium", fontSize: 16, lineHeight: 28 }}
                                placeholderTextColor={"#888DAA"}
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingTop: 36, justifyContent: "center", paddingBottom: 106 }}>
                            <FontAwesome5 name="copy" size={24} color="#FEBF32" />
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", lineHeight: 24, color: "#FEBF32", textAlign: "center" }}>Copy to Clipboard</Text>
                        </View>
                    </> :
                    <View style={{ alignItems: "center", paddingBottom:92,paddingTop:16 }}>
                        <QrCode />
                    </View>

            }



        </>

    )
}

const styles = StyleSheet.create({
    tabButtonActive: {
        paddingHorizontal: 16,
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    tabButtonDeactive: {
        paddingHorizontal: 16,
    },
})
export default StepTwo