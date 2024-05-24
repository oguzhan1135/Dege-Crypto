import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppNavigation } from '../../../Router/useAppNavigation';
import { OnboardingStackParamList } from '../../../Router/navigation';

const styles = StyleSheet.create({
    defaultButtonStyle: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2a2d3c',
        height: "auto",
        padding: 12
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Poppins_700Bold",
    }
});

type ButtonProp<K extends keyof OnboardingStackParamList> = {
    page?: K;
    text: string;
    onPress?: () => void;
    param?: OnboardingStackParamList[K] extends { params: infer P } ? P : undefined;
    disabled?: boolean;
};

const PrimaryButton = <K extends keyof OnboardingStackParamList>({ page, param, text, onPress, disabled = false }: ButtonProp<K>) => {
    const navigation = useAppNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
        if (page) {
            navigation.navigate("Onboarding", { screen: page, params: {param} });
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.defaultButtonStyle,
                {
                    backgroundColor: pressed ? '#FEE083' : '#FEBF32',
                }
            ]}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

export default PrimaryButton;
