import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface TextProps {
    text: string;
    fontSize: number;
    lineHeight: number;
    maxWidth: number;
    row: number;
}

const GradiantText: React.FC<TextProps> = ({ text, fontSize, lineHeight, maxWidth, row }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#17171a',
            paddingTop: 40,
            paddingBottom: 40,
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        },
        title: {
            fontSize: fontSize,
            width: maxWidth,
            lineHeight: lineHeight,
        },
        gradient: {
            height: row === 2 ? lineHeight * row : lineHeight,
        },
    });

    return (
        <MaskedView maskElement={<Text style={styles.title}>{text}</Text>}>
            <LinearGradient
                colors={['rgba(169,205,255,1)', 'rgba(114,246,209,1)', 'rgba(160,237,141,1)', 'rgba(254,211,101,1)', 'rgba(250,164,158,1)']}
                locations={[0, 0.22, 0.56, 0.82, 1]}
                style={styles.gradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <Text style={{ opacity: 0 }}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );
}

export default GradiantText;
