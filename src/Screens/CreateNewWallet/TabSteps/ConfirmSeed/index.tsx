import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from "expo-blur";
import SecondaryButton from "../../../../Components/Buttons/Secondary";
import GradiantText from "../../../../Components/GradiantText";

const ConfirmSeed = () => {
    let seedWords = [
        {
            id: 3,
            word: "abuse"
        },
        {
            id: 7,
            word: "exit",
        },
        {
            id: 12,
            word: "organ"
        }
    ];

    const [blurred, setBlurred] = useState(true);
    const [intensity, setIntensity] = useState(10);
    const [confirmSeedStep, setConfirmSeedStep] = useState(0);
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedId, setSelectedId] = useState(seedWords[0].id);
    const [seed, setSeed] = useState("");
    React.useEffect(() => {
        if (blurred) {
            setIntensity(10);
        } else {
            setIntensity(0);
        }
    }, [blurred]);

    const toggleBlur = () => {
        setBlurred(!blurred);
    };

    const renderTab = (step: number) => {
        const isActive = confirmSeedStep === step;
        return (
            <TouchableOpacity style={{ margin: 0, padding: 0, flex: 1, height: 8 }} onPress={() => setConfirmSeedStep(step)}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar,]} />
            </TouchableOpacity>
        );
    };

    const selectWord = (word: string, id: number) => {
        if (id === selectedId) {
            setSelectedWord(word);
            setConfirmSeedStep(confirmSeedStep + 1);
            setSelectedId(seedWords[confirmSeedStep].id);
            setSelectedWord(selectedWord);
            setSeed(word)
        } else {
            console.log("Yanlış kelime!");
        }
        setTimeout(() => {
            setSeed("")
            setSelectedId(seedWords[confirmSeedStep + 1].id)
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{}}>
                    <GradiantText text={"Confirm Seed Phrase"} fontSize={18} lineHeight={28} width={300} row={1} />
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.paragraphText}>Select each word in the order it was presented to you</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ paddingBottom: 0 }}>
                    <GradiantText text={`${selectedId} ${seed}`} fontSize={40} lineHeight={56} width={200} row={1} />
                </View>
                <View style={styles.progressContainer}>
                    {renderTab(1)}
                    {renderTab(2)}
                    {renderTab(3)}
                </View>

            </View>
            <View style={styles.seedPhrase}>
                <View style={styles.boxContainer}>
                    {seedWords.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => selectWord(item.word, item.id)}>
                            <View style={styles.box}>
                                <Text style={styles.boxText}>{item.word}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        backgroundColor: "#2A2D3C",
        paddingHorizontal: 24,
        paddingVertical: 8
    },
    boxContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 16
    },
    seedPhrase: {
        flexDirection: "column",
        alignContent: "center",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#222531",
        padding: 24,
        gap: 16
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingTop: 100,
        paddingHorizontal: 96,
        paddingBottom: 30
    },
    container: {
        justifyContent: "center",
    },
    title: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        paddingBottom: 20
    },
    paragraphText: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
        paddingBottom: 80,
        textAlign: "center"
    },
    boxText: {
        fontSize: 14,
        lineHeight: 24,
        color: "white"
    },
    activeTabBar: {
        height: 8,
        backgroundColor: '#FEBF32',
        borderRadius: 2,
    },
    inactiveTabBar: {
        height: 8,
        borderRadius: 2,
        backgroundColor: '#2A2D3C',
    },
});
export default ConfirmSeed;
