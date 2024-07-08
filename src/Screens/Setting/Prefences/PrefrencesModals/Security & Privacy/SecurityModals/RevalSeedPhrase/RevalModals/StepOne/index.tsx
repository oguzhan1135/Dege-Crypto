import { View, TextInput, Text, StyleSheet } from "react-native";

const StepOne = () => (
    <>
        <View style={{ gap: 24, paddingBottom: 40 }}>
            <Text style={styles.contentText}>If you ever change browser or move computers, you will need this seed phrase to access your accounts. Save them somewhere safe and secret</Text>
            <Text style={styles.contentText}><Text style={{ color: "red" }}>DO NOT</Text> share this phrase with anymore! These words can be used to steal all your accounts</Text>
        </View>
        <View style={{ borderRadius: 8, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, borderColor: "#2a2d3c" }}>
            <TextInput
                placeholder="Enter password continue"
                placeholderTextColor={"#888DAA"}
                style={{ color: "white" }}
                secureTextEntry
            />
        </View>
    </>
)
const styles = StyleSheet.create({
    contentText: {
        fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#ABAFC4"
    }
});
export default StepOne