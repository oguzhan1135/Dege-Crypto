import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TextProps {
    text: string;
    fontSize: number;
    lineHeight: number;
    width: number;
    row: number;
}

const GradiantText: React.FC<TextProps> = ({ text, fontSize, lineHeight, width, row }) => {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        title: {
            fontSize: fontSize,
            width: width,
            lineHeight: lineHeight,
            fontFamily: "Poppins_500Medium"
        },
        gradient: {
            justifyContent: "center",
            alignItems: "center",
            height: lineHeight * row
        },
        maskedView: {
            width: "100%",

        },
        transparentText: {
            color: 'transparent',
            fontSize: fontSize,
            lineHeight: lineHeight,
            fontFamily: "Poppins_500Medium"

        },
    });
  
        return (
            <View style={styles.container}>
                <MaskedView style={styles.maskedView} maskElement={<Text style={styles.title}>{text}</Text>}>
                    <LinearGradient
                        colors={['rgba(169,205,255,1)', 'rgba(114,246,209,1)', 'rgba(160,237,141,1)', 'rgba(254,211,101,1)', 'rgba(250,164,158,1)']}
                        locations={[0, 0.22, 0.56, 0.82, 1]}
                        style={[styles.gradient, { height: lineHeight * row }]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Text style={styles.transparentText}>{text}</Text>
                    </LinearGradient>
                </MaskedView>
            </View>
        );
    }


export default GradiantText;
