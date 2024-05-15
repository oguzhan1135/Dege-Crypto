import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradiantText from '../../../../../../Components/GradiantText';
import { BlurView } from 'expo-blur';

function WriteYourSeed() {
    const [blurred, setBlurred] = useState(true);

    const toggleBlur = () => {
        setBlurred(!blurred);
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{}}>
                    <GradiantText text={"Write Down Your Seed Phrase"} fontSize={18} lineHeight={28} width={300} row={1} />
                </View>
            </View>
            <Text style={styles.paragraphText}>This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase (in order) on the next step.</Text>

            <TouchableOpacity onPress={toggleBlur}>
                <BlurView intensity={blurred ? 100 : 0} tint="dark" style={styles.blurView}>
                    <Text style={styles.buttonText}>Bana Bas</Text>
                </BlurView>
            </TouchableOpacity>

            {!blurred && (
                <View style={styles.seedPhrase}>
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>1. future</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>2. use</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>3. abuse</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>4. bubble</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>5. disagree</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>6. yard</Text>
                        </View>
                    </View>
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>7. exit</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>8. enact</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>9. drum</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>10. frequent</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>11. target</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>12. organ</Text>
                        </View>
                    </View>
                </View>
            )}
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
    },
    paragraphText: {
        color: "#ABAFC4",
        fontSize: 14,
        lineHeight: 24,
        paddingBottom: 44
    },
    seedPhrase: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#222531",
        width: "100%",
        height: 320,
        padding: 24,
        gap: 16,
        flexDirection: "row",
        position: "relative",
    },
    box: {
        backgroundColor: "#2A2D3C",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 4,
        borderRadius: 8
    },
    boxText: {
        fontSize: 14,
        lineHeight: 24,
        color: "white"
    },
    boxContainer: {
        flexDirection: "column",
        gap: 16,
        flex: 1,
    },
    blurView: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 8,
    },
});

export default WriteYourSeed;
