import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import GradiantText from '../../../../../../Components/GradiantText';
import { BlurView } from 'expo-blur';
import SecondaryButton from '../../../../../../Components/Buttons/Secondary';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


interface WriteYourSeedprop {
    onchangeView: (view: boolean) => void;
}

const WriteYourSeed: React.FC<WriteYourSeedprop> = ({ onchangeView }) => {

    const [blurred, setBlurred] = useState(true);
    const [intensity, setIntensity] = useState(10);

    React.useEffect(() => {
        if (blurred) {
            setIntensity(10)
        } else {
            setIntensity(0)
        }
    }, [blurred]);

    const toggleBlur = () => {
        setBlurred(!blurred);
    };


    const font = "Poppins_500Medium"

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{}}>
                    <GradiantText text={"Write Down Your Seed Phrase"} fontSize={18} lineHeight={28} width={350} row={1} />
                </View>
            </View>
            <Text style={styles.paragraphText}>This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase (in order) on the next step.</Text>




            <View style={{ borderRadius: 8, overflow: "hidden", position: "relative" }}>
                <BlurView style={{ borderRadius: 0 }} intensity={intensity}>
                    <View style={blurred ? { opacity: 0.025 } : { opacity: 1 }}>
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
                    </View>
                </BlurView>
                <View style={blurred ? { position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -130 }, { translateY: -60 }] } : { display: "none" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", gap: 12 }}>
                        <Text style={{ fontSize: 14, lineHeight: 24, color: "white", fontFamily: "Poppins_500Medium" }}>Tap to reveal your seed phrase</Text>
                        <Text style={{ fontSize: 12, lineHeight: 18, color: "#ABAFC4", paddingBottom: 28, fontFamily: "Poppins_500Medium" }}>Make sure no one is watching your screen.</Text>
                        <SecondaryButton text='View' icon={<FontAwesome5 name="eye" size={24} color="#FEBF32" />} onPress={() => { toggleBlur(); onchangeView(blurred) }} disabled={false} />
                    </View>
                </View>
            </View>




        </View>
    );
}
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "red"
    },
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
        paddingBottom: 44,
        fontFamily: "Poppins_500Medium"
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
        color: "white",
        fontFamily: "Poppins_500Medium"
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
