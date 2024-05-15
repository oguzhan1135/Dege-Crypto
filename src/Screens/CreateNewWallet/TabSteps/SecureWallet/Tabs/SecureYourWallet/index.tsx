import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradiantText from '../../../../../../Components/GradiantText';
import Feather from '@expo/vector-icons/Feather';

function SecureYourWallet() {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{}}>
                    <GradiantText text={"Secure Your Wallet"} fontSize={18} lineHeight={28} width={300} row={1} />

                </View>
                <Feather style={{ position: "absolute", right: 0 }} name="info" size={24} color="white" />

            </View>
            <Text style={{ fontSize: 14, lineHeight: 20, color: "white", paddingBottom: 24 }}>Secure your wallet's
                <Text style={{ fontSize: 14, lineHeight: 20, color: "#5F97FF" }} > "Seed Phrase"</Text></Text>
            <Text style={{ fontSize: 14, lineHeight: 24, fontWeight: "bold", color: "white" }}>Manual</Text>
            <Text style={styles.paragraphText}>Write down your seed phrase on a piece of paper and store in a safe place.</Text>
            <Text style={styles.paragraphText}>Security level: Very strong</Text>
            <View style={styles.passwordProgressContainer}>
                <View style={styles.passwordProgress} />
                <View style={styles.passwordProgress} />
                <View style={styles.passwordProgress} />
            </View>
            <View style={{ gap: 3 }}>
                <Text style={styles.paragraphText}>Risk are:</Text>
                <Text style={styles.paragraphText}>• You lose it</Text>
                <Text style={styles.paragraphText}>• You forget where you put it</Text>
                <Text style={styles.paragraphText}>• Someone else finds it</Text>
            </View>
            <Text style={styles.paragraphText}>Other options: Doesn't have to be paper!</Text>
            <View style={{ gap: 3 }}>
                <Text style={styles.paragraphText}>Tips:</Text>
                <Text style={styles.paragraphText}>• Store in bank vault</Text>
                <Text style={styles.paragraphText}>• Store in a safe</Text>
                <Text style={styles.paragraphText}>• Store in multiple secret places</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        gap: 16
    },
    title: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        position: "relative"
    },
    passwordProgressContainer: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start",
        paddingRight: 30
    },
    passwordProgress: {
        width: "20%",
        height: 8,
        borderRadius: 2,
        backgroundColor: "#76E268"
    },
    paragraphText: {
        color: "white",
        fontSize: 14,
        lineHeight: 24

    }
});

export default SecureYourWallet;
