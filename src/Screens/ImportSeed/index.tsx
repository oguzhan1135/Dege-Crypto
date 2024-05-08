import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, TextInput, Switch } from 'react-native';
import { useAppNavigation } from '../../Router/useAppNavigation';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SwitchCustom from 'expo-custom-switch';
import PrimaryButton from '../../Components/Buttons/Primary';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        gap: 40,

    },
    navbar: {
        alignItems: "flex-start",
        flexDirection: "row",
        paddingTop: 18,
        paddingBottom: 18,
    },
    navbarText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
    },
    navigationContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    navigationArrow: {
        position: "absolute",
        top: "60%",
        borderRadius: 50,
        padding: 5
    },
    formContainer: {
        flexDirection: "column",
        gap: 24
    },
    formSeedInputContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    formSeedInputArea: {
        height: 64,
        borderRadius: 8,
        borderColor: "#2A2D3C",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "row",
        gap: 0
    },
    formSeedInput: {
        color: "white",
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold",
        width: "80%",
        height: 64
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    }

});

const ImportSeed = () => {
    const navigation = useAppNavigation();
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (

        <View style={styles.container}>
            <View style={styles.navbar}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Onboarding", {
                            screen: 'WalletSetUp',
                        })
                    }}
                    style={({ pressed }) => [
                        styles.navigationArrow,
                        {
                            backgroundColor: pressed ? '#44485F' : 'transparent',

                        }
                    ]}
                >
                    <AntDesign name="left" size={20} color="white" />
                </Pressable>

                <View style={styles.navigationContainer}>
                    <Text style={styles.navbarText}>Import From Seed</Text>
                </View>

            </View>
            <View style={styles.formContainer}>
                <View style={styles.formSeedInputContainer}>
                    <View style={styles.formSeedInputArea}>
                        <TextInput
                            style={styles.formSeedInput}
                            placeholder='Seed Phrase'
                            placeholderTextColor={"#888DAA"}
                        />
                        <FontAwesome5 name="eye" size={24} color="white" />
                    </View>
                    <MaterialCommunityIcons style={{ paddingRight: 19 }} name="line-scan" size={24} color="#FEBF32" />
                </View>
                <View style={styles.formPasswordInputContainer}>
                    <View style={styles.formPasswordInputArea}>
                        <TextInput
                            style={styles.formPasswordInput}
                            placeholder='New Password'
                            placeholderTextColor={"#888DAA"}
                            secureTextEntry
                        />
                        <FontAwesome5 name="eye" size={24} color="white" />
                    </View>
                    <Text style={styles.inputInfo}>Must be at least 8 characters</Text>
                </View>
                <View style={styles.formPasswordInputContainer}>
                    <View style={styles.formPasswordInputArea}>
                        <TextInput
                            style={styles.formPasswordInput}
                            placeholder='Confirm Password'
                            placeholderTextColor={"#888DAA"}
                            secureTextEntry
                        />
                        <FontAwesome5 name="eye" size={24} color="white" />

                    </View>
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
                <Text style={{ color: "#ABABB0", fontSize: 17, lineHeight: 24 }}>Byproceeding, you agree to these Term and Conditions.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton page='Walthought' text='Import' />
            </View>
        </View>
    );
}

export default ImportSeed;
