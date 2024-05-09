import React from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import PrimaryButton from '../../Components/Buttons/Primary';
import ConfirmSeed from './TabSteps/ConfirmSeed';
import CreatePassword from './TabSteps/CreatePassword';
import SecureWallet from './TabSteps/SecureWallet';
import { useAppNavigation } from '../../Router/useAppNavigation';


const CreateNewWallet = () => {
    const navigation = useAppNavigation();

    const [currentStep, setCurrentStep] = React.useState(1);
    const renderTab = (step: number) => {
        const isActive = step <= currentStep;
        return (

            <TouchableOpacity style={{ margin: 0, padding: 0, flex: 1, height: 8 }} onPress={() => setCurrentStep(step)} key={step}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar,]} />
            </TouchableOpacity>

        );
    };
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <CreatePassword />;
            case 2:
                return <SecureWallet />;
            case 3:
                return <ConfirmSeed />;
            default:
                return null;
        }
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
                    text={currentStep < 2 ? "Create Password" : "Start"}
                    onPress={() => {
                        if (currentStep === 3) {
                            // Import function
                        } else {
                            setCurrentStep((prevStep) => prevStep + 1);
                        }
                    }}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingLeft:24,
        paddingRight:24

    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
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
