import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import SuccessContent from './TabSteps/ConfirmSeed';
import AntDesign from '@expo/vector-icons/AntDesign';
import PrimaryButton from '../../Components/Buttons/Primary';
import ConfirmSeed from './TabSteps/ConfirmSeed';
import CreatePassword, { PasswordData } from './TabSteps/CreatePassword';
import SecureWallet from './TabSteps/SecureWallet';
import { useAppNavigation } from '../../Router/useAppNavigation';
import SecureYourWallet from './TabSteps/SecureWallet/Tabs/SecureYourWallet';
import WriteYourSeed from './TabSteps/SecureWallet/Tabs/WriteDownYourSeed';

function CreateNewWallet() {
    const navigation = useAppNavigation();
    const [passwordData, setPasswordData] = useState<PasswordData>({
        password: '',
        confirmPassword: '',
        faceId: false,
        passwordRule: false
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [smallStep, setSmallStep] = useState(1);
    const [caseNumber, setCaseNumber] = useState(currentStep);
    const [stepContent, setStepContent] = useState<JSX.Element | null>(null);

    const renderTab = (step: number) => {
        const isActive = currentStep === 3 ? (smallStep >= 2 ? step <= 3 : step <= currentStep) : step <= currentStep;
        return (
            <TouchableOpacity style={{ margin: 0, padding: 0, flex: 1, height: 8 }}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar]} />
            </TouchableOpacity>
        );
    };

    const renderStepContent = () => {
        switch (caseNumber) {
            case 1:
                return <CreatePassword onPasswordChange={handlePasswordChange} />;
            case 2:
                return <SecureWallet onChangeStep={handleStepChange} />;
            case 3:
                return <SecureYourWallet />;
            case 4:
                return <WriteYourSeed />;
            case 5:
                return <ConfirmSeed />;
            default:
                return null;
        }
    };

    const handlePasswordChange = (data: PasswordData) => {
        setPasswordData(data);
    };

    const handleStepChange = (step: number) => {
        setSmallStep(step);
        setCaseNumber(caseNumber + 1);
        console.log(smallStep);
        console.log("case numarası =>", caseNumber);
    };

    const handleConfirmButtonPress = () => {
        if (currentStep >= 2) {
            if (smallStep >= 2) {
                if (caseNumber === 4) {
                    setCurrentStep(3);
                }
                setCaseNumber(caseNumber + 1);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
        console.log(passwordData);
        console.log(currentStep);
    };

    const handleBackButtonPress = () => {
        if (currentStep === 1) {
            navigation.navigate("Onboarding", {
                screen: 'WalletSetUp',
            });
        } else if (currentStep === 2) {
            if (caseNumber > 2) {
                setCurrentStep(2);
                setCaseNumber(2);
            } else {
                setCurrentStep(1);
                setCaseNumber(1);
            }
        } else {
            setCurrentStep((prevStep) => prevStep - 1);
            setCaseNumber((prevStep) => prevStep - 1);
        }
    };

    const handleSuccess = () => {
        navigation.navigate("Onboarding", {
            screen: 'Homescreen',
        });
    };

    useEffect(() => {
        const content = renderStepContent();
        setStepContent(content);
        if (content === null) {
            handleSuccess();
        }
    }, [caseNumber]);

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <View style={styles.navbarInnerContainer}>
                    <Pressable
                        onPress={handleBackButtonPress}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#44485F' : 'transparent' },
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
            <View style={styles.contentContainer}>
                {stepContent}
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text={currentStep < 2 ? 'Create Password' : 'Next'}
                    onPress={() => {
                        setCaseNumber(caseNumber + 1);
                        handleConfirmButtonPress();
                    }}
                    disabled={currentStep === 1 && (passwordData.password === '' || passwordData.confirmPassword === '' || passwordData.passwordRule === false)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
    },
    buttonContainer: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,
        gap: 10,
    },
    navbarContainer: {
        padding: 20,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    navbarInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    navbarIcon: {
        marginRight: 0,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingRight: 40,
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
