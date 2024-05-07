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
        width: "100%",
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
    page: keyof OnboardingStackParamList;
    text: string;
}

const PrimaryButton: React.FC<ButtonProp> = ({ page, text }) => {
    const navigation = useAppNavigation();
    return (
        <View style={{ width: "100%", paddingLeft: 24, paddingRight: 24 }}>
            <Pressable
                onPress={() => {
                    navigation.navigate("Onboarding", {
                        screen: page,
                    })
                }}
                style={({ pressed }) => [
                    styles.defaultButtonStyle,
                    {
                        backgroundColor: pressed ? '#FEE083' : '#FEBF32',

                    }
                ]}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;