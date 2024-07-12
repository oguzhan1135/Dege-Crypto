import React, { useState, FC } from "react";
import { View, TextInput, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GradiantText from "../../../../Components/GradiantText";
import Checkbox from 'expo-checkbox';

interface CreatePasswordProps {
    onPasswordChange: (data: PasswordData) => void;
}

export interface PasswordData {
    passwordVisible?: boolean;
    confirmPasswordVisible?: boolean;
    password: string;
    confirmPassword: string;
    faceId: boolean;
    passwordRule: boolean;
}

const CreatePassword: FC<CreatePasswordProps> = ({ onPasswordChange }) => {
    const [data, setData] = useState<PasswordData>({
        password: '',
        confirmPassword: '',
        faceId: false,
        passwordRule: false
    });
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)

    const checkPasswordStrength = (password: string): boolean => {
        const minLength = 6;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const hasMinLength = password.length >= minLength;
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasSymbol = symbolRegex.test(password);

        return hasMinLength && hasUppercase && hasLowercase && hasSymbol;
    };
    const toggleSwitch = (value: boolean) => {
        setData(prevState => ({ ...prevState, faceId: value }));
        onPasswordChange({ ...data, faceId: value });
    };

    const handlePasswordChange = (text: string) => {
        const passwordStrength = checkPasswordStrength(text);
        setData(prevState => ({ ...prevState, password: text, passwordRule: passwordStrength }));
        onPasswordChange({ ...data, password: text, passwordRule: passwordStrength });
    };

    const handleConfirmPasswordChange = (text: string) => {
        setData(prevState => ({ ...prevState, confirmPassword: text }));
        onPasswordChange({ ...data, confirmPassword: text });
    };

    const handlePasswordRuleChange = (value: boolean) => {
        setData(prevState => ({ ...prevState, passwordRule: value }));
        onPasswordChange({ ...data, passwordRule: value });
    };

    return (
        <View style={styles.formContainer}>

            <View style={styles.titleContainer}>
                <View style={{ alignItems: "center" }}>
                    <GradiantText text={"Create Passwords"} fontSize={16} lineHeight={24} width={300} row={1} />
                </View>

                <Text style={{
                    fontSize: 14, lineHeight: 24, color: "#ABAFC4", textAlign: "center", fontFamily: "Poppins_500Medium"
                }}>This password will unlock your Metamask wallet only on this service</Text>
            </View>

            <View style={styles.formPasswordInputContainer}>
                <View style={styles.formPasswordInputArea}>
                    <TextInput
                        style={styles.formPasswordInput}
                        placeholder="New Password"
                        placeholderTextColor={"#888DAA"}
                        secureTextEntry={passwordVisible}
                        onChangeText={handlePasswordChange}
                        value={data.password}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.inputInfo}>Password strength: <Text style={{ color: data.passwordRule ? "#76E268" : "#FF6961", fontSize: 12 }}>{data.passwordRule ? "Good" : "Bad"}</Text></Text>
            </View>

            <View style={styles.formPasswordInputContainer}>
                <View style={styles.formPasswordInputArea}>
                    <TextInput
                        style={styles.formPasswordInput}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#888DAA"}
                        secureTextEntry={confirmPasswordVisible}
                        onChangeText={handleConfirmPasswordChange}
                        value={data.confirmPassword}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <FontAwesome5 name={confirmPasswordVisible ? "eye" : "eye-slash"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.inputInfo}>Must be at least 8 characters.  <Text style={{ color: data.password === data.confirmPassword ? "#76E268" : "#FF6961", fontSize: 12 }}>{data.password === data.confirmPassword ? "Password is same" : "Password is not same"}</Text></Text>
            </View>

            <View style={styles.faceIdContainer}>
                <Text style={{
                    fontSize: 16, lineHeight: 24, fontWeight: "bold", color: "white", fontFamily: "Poppins_500Medium"
                }}>Sign in with Face ID?</Text>
                <Switch
                    trackColor={{ false: '#D3D3D3', true: '#FFD700' }}
                    thumbColor={data.faceId ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={data.faceId}
                    style={{
                        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                        borderRadius: 0
                    }}
                />
            </View>
            <View style={styles.checkContainer}>
                <Checkbox
                    value={data.passwordRule}
                    onValueChange={handlePasswordRuleChange}
                    color="#FEBF32"
                />
                <Text style={{
                    fontSize: 14, lineHeight: 20, color: "white", fontFamily: "Poppins_500Medium"
                }}>I understand that DeGe cannot recover this password for me.
                    <Text style={{ fontSize: 14, lineHeight: 20, color: "#5F97FF" }} > Learn more</Text></Text>
            </View>
        </View>
    )
};

export default CreatePassword;

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
        height: 64,
        fontFamily: "Poppins_500Medium"

    },
    inputInfo: {
        color: "#888DAA",
        fontSize: 12,
        lineHeight: 16,
        paddingLeft: 16,
        fontFamily: "Poppins_500Medium"

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
