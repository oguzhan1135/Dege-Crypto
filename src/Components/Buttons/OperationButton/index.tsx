import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ButtonProps {
    title: string;
    containerActive: boolean;
    textActive: boolean;

}

const OperationButton: React.FC<ButtonProps> = ({ title, containerActive,textActive }) => {
    return (
        <View>
            <View style={[styles.container, containerActive && styles.activeContainer]}>
                <Text style={[styles.text , textActive && styles.activeText]}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2a2d3c',
        width:"100%",
        height:"auto"
    },
    text: {
        color: "#4c516b",
        fontSize:16,
        lineHeight:24
    },
    activeContainer: {
        backgroundColor: "#FEBF32"
    },
    activeText: {
        color: "#FEBF32"
    }
})

export default OperationButton;
