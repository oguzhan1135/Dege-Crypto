import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
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
        fontWeight: "bold"
    }
})

interface ButtonProp {
    page?: keyof OnboardingStackParamList;
    text: string;
    onPress?: () => void;
    disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProp> = ({ page, text, onPress,disabled=false }) => {
    const navigation = useAppNavigation();

    const handlePress = () => {
        if (onPress && page) {
            onPress();
            navigation.navigate("Onboarding", { screen: page });
        } else if (onPress) {
            onPress();
        } else if (page) {
            navigation.navigate("Onboarding", { screen: page });
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
}

export default PrimaryButton;
