import React, { useState, useEffect, useContext } from 'react';
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
import { MainContext } from '../../Context';
import User1 from "../../../assets/images/User-1.svg"

function CreateNewWallet() {
    const navigation = useAppNavigation();
    const { setSentAccount } = useContext(MainContext)
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
    const [view, setView] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const renderTab = (step: number) => {
        const isActive = currentStep === 3 ? (smallStep >= 2 ? step <= 3 : step <= currentStep) : step <= currentStep;
        return (
            <TouchableOpacity style={{ margin: 0, padding: 0, flex: 1, height: 8 }}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar]} />
            </TouchableOpacity>
        );
    };

    const onchangeView = (view: boolean) => {
        setView(view)
    }

    const onChangeConfirm = (confirm: boolean) => {
        setConfirm(confirm)
    }

    const renderStepContent = () => {
        switch (caseNumber) {
            case 1:
                return <CreatePassword onPasswordChange={handlePasswordChange} />;
            case 2:
                return <SecureWallet onChangeStep={handleStepChange} />;
            case 3:
                return <SecureYourWallet />;
            case 4:
                return <WriteYourSeed onchangeView={onchangeView} />;
            case 5:
                return <ConfirmSeed onChangeConfirm={onChangeConfirm} />;
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
        //user password and confirm password control point
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
        setSentAccount( {
            id: 1,
            name: "Account 1",
            avatar: <User1 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,
            balance: [
                {
                    coinName: "BNB",
                    balance: 19.2371
                },
                {
                    coinName: "USDC",
                    balance: 92.3
                },
                {
                    coinName: "SNX",
                    balance: 42.74
                },
                {
                    coinName: "ETH",
                    balance: 9.2362
                }
            ],
            adress: "0x4Dc6...DxR9",
            transaction: [
                {
                    id: 1,
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 2,
                    type: "Received",
                    amount: 1.88,
                    date: "Aug 14 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 3,
                    type: "Sent",
                    amount: 2.35,
                    date: "Sep 4 at 11:04am",
                    networkFee: 0.08,
                    paymenToAdress: "0x3Dc6...DxE12",
                    currency: "BNB",
                    status: "Cancelled"
                },
                {
                    id: 4,
                    type: "Received",
                    amount: 1.876,
                    date: "Aug 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 5,
                    type: "Received",
                    amount: 410,
                    date: "Feb 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 6,
                    type: "Received",
                    amount: 100,
                    date: "Aug 30 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Cancelled"
                },
                {
                    id: 7,
                    type: "Received",
                    amount: 3,
                    date: "Feb 12 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Confirmed"
                },
                {
                    id: 8,
                    type: "Received",
                    amount: 10,
                    date: "Jan 21 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Cancelled"
                },
            ],
            password: "Example123"
        })
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
                        style={({ pressed }) => [styles.navigationArrow,
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
                {
                    currentStep < 2 ?
                        <PrimaryButton
                            text='Create Password'
                            onPress={() => {
                                setCaseNumber(caseNumber + 1);
                                handleConfirmButtonPress();
                            }}
                            disabled={currentStep === 1 && (
                                passwordData.password === '' ||
                                passwordData.confirmPassword === '' ||
                                passwordData.passwordRule === false ||
                                passwordData.confirmPassword !== passwordData.password

                            )}
                        /> :
                        <PrimaryButton
                            text='Next'
                            onPress={() => {
                                setCaseNumber(caseNumber + 1);
                                handleConfirmButtonPress();
                            }}
                            disabled={(caseNumber === 4 && view === false) || (caseNumber === 5 && confirm === false)
                            }
                        />

                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navigationArrow: {
        borderRadius: 50,
        paddingVertical:10,
        paddingRight:8,
    },
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
        gap: 10,
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
