import React from "react";
import { View, TextInput, StyleSheet, Text, Switch } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GradiantText from "../../../../Components/GradiantText";
import Checkbox from 'expo-checkbox';


const styles = StyleSheet.create({

    formContainer: {
        flexDirection: "column",
        gap: 30
    },

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
    inputInfo: {
        color: "#888DAA",
        fontSize: 12,
        lineHeight: 16,
        paddingLeft: 16
    },
    faceIdContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 40
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    navigationArrow: {
        borderRadius: 50,
        paddingRight: 0
    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        flexDirection: "column",
        gap: 8,
    },
    checkContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        paddingRight: 20
    }
});
const CreatePassword = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.formContainer}>

            <View style={styles.titleContainer}>
                <GradiantText text={"Create Passwordas"} fontSize={16} lineHeight={24} maxWidth={300} row={1} />
                <Text style={{ fontSize: 16, lineHeight: 24, color: "#ABAFC4", textAlign: "center" }}>This password will unlock your Metamask wallet only on this service</Text>
            </View>



            <View style={styles.formPasswordInputContainer}>
                <View style={styles.formPasswordInputArea}>
                    <TextInput
                        style={styles.formPasswordInput}
                        placeholder="New Password"
                        placeholderTextColor={"#888DAA"}
                        secureTextEntry
                    />
                    <FontAwesome5 name="eye" size={24} color="white" />
                </View>
                <Text style={styles.inputInfo}>Password strenth: <Text style={{ color: "#76E268", fontSize: 12 }}>Good</Text></Text>
            </View>
            <View style={styles.formPasswordInputContainer}>
                <View style={styles.formPasswordInputArea}>
                    <TextInput
                        style={styles.formPasswordInput}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#888DAA"}
                        secureTextEntry
                    />
                    <FontAwesome5 name="eye" size={24} color="white" />
                </View>
                <Text style={styles.inputInfo}>Must be at least 8 characters</Text>
            </View>

            <View style={styles.faceIdContainer}>
                <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "bold", color: "white" }}>Sign in with Face ID?</Text>
                <Switch
                    trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{
                        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                        borderRadius: 0
                    }}

                />
            </View>
            <View style={styles.checkContainer}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color="#FEBF32"

                />
                <Text style={{ fontSize: 14, lineHeight: 20, color: "white" }}>I understand that DeGe cannot recover this password for me.
                    <Text style={{ fontSize: 14, lineHeight: 20, color: "#5F97FF" }} > Learn more</Text></Text>
            </View>
        </View>
    )

};
export default CreatePassword;