import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { useAppNavigation } from '../../../Router/useAppNavigation';
import { OnboardingStackParamList } from '../../../Router/navigation';

const styles = StyleSheet.create({
    defaultButtonStyle: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2A2D3C',
        height: "auto",
        padding: 12
    },
    buttonText: {
        color: "#FEBF32",
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Poppins_700Bold",

    }
})

interface ButtonProp {
    page?: keyof OnboardingStackParamList;
    text: string;
    onPress?: () => void;
    disabled?: boolean;
    icon?: any;
}

const SecondaryButton: React.FC<ButtonProp> = ({ page, text, onPress, icon }) => {
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
                    backgroundColor: pressed ? '#44485F' : '#2a2d3c',

                }
            ]}
        >
            {
                icon ?
                    <>
                        <View style={{ flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" }}>
                            {icon}
                            <Text style={styles.buttonText}>{text}</Text>
                        </View>
                    </> :
                    <Text style={styles.buttonText}>{text}</Text>

            }

        </Pressable>
    );
}

export default SecondaryButton;