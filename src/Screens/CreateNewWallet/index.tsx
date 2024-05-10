import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import PrimaryButton from '../../Components/Buttons/Primary';
import ConfirmSeed from './TabSteps/ConfirmSeed';
import CreatePassword, { PasswordData } from './TabSteps/CreatePassword';
import SecureWallet from './TabSteps/SecureWallet';
import { useAppNavigation } from '../../Router/useAppNavigation';


const CreateNewWallet = () => {
    const navigation = useAppNavigation();
    const [passwordData, setPasswordData] = useState<PasswordData>({
        password: '',
        confirmPassword: '',
        faceId: false,
        passwordRule: false
    });
    const [currentStep, setCurrentStep] = useState(1);
    const renderTab = (step: number) => {
        const isActive = step <= currentStep;
        return (
            <TouchableOpacity style={{ margin: 0, padding: 0, flex: 1, height: 8 }}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar,]} />
            </TouchableOpacity>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <CreatePassword onPasswordChange={handlePasswordChange} />;
            case 2:
                return <SecureWallet />;
            case 3:
                return <ConfirmSeed />;
            default:
                return null;
        }
    };

    const handlePasswordChange = (data: PasswordData) => {
        setPasswordData(data);
    };

    const handleConfirmButtonPress = () => {
        console.log(passwordData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <View style={styles.navbarInnerContainer}>
                    <Pressable
                        onPress={() => {
                            if (currentStep === 1) {
                                navigation.navigate("Onboarding", {
                                    screen: 'WalletSetUp',
                                })
                            } else {
                                setCurrentStep((prevStep) => prevStep - 1);
                            }
                        }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#44485F' : 'transparent',
                            }
                        ]}
                    >
                        <AntDesign name="left" size={20} color="white" />
                    </Pressable>
                    <View style={styles.progressContainer}>
                        {renderTab(1)}
                        {renderTab(2)}
                        {renderTab(3)}
                        <Text style={{ color: "#7C81A2", fontSize: 12, lineHeight: 16, fontWeight: "600" }}>{currentStep}/3</Text>
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>{renderStepContent()}</View>

            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text={currentStep < 2 ? 'Create Password' : 'Start'}
                    onPress={() => {
                        if (currentStep === 3) {

                        } else {
                            setCurrentStep((prevStep) => prevStep + 1);
                        }
                        handleConfirmButtonPress();
                    }}
                    disabled={currentStep === 1 && (passwordData.password === '' || passwordData.confirmPassword === '' || passwordData.passwordRule === false)} // Password girilmediyse butonu pasif yapar
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24
    },
    buttonContainer: {
        paddingLeft: 24,
        paddingRight: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,
        gap: 10
    },
    navbarContainer: {
        padding: 20,
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    navbarInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    navbarIcon: {
        marginRight: 0,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingRight: 40
    },
    activeTabBar: {
        height: 8,
        backgroundColor: '#FEBF32',
        borderRadius: 2,
    },
    inactiveTabBar: {
        height: 8,
        borderRadius: 2,
        backgroundColor: '#2A2D3C',
    },
});

export default CreateNewWallet;
