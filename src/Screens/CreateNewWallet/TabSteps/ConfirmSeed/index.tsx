import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GradiantText from "../../../../Components/GradiantText";

const SuccessContent = () => {
    return (
        <View style={{ justifyContent: "center", alignContent: "center", gap: 24 }}>
            <View style={[styles.title, { paddingTop: 100, paddingBottom: 40 }]}>
                <View>
                    <GradiantText text={"Success!"} fontSize={40} lineHeight={56} width={300} row={1} />
                </View>
            </View>
            <Text style={styles.succesText}>You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!</Text>
            <Text style={styles.succesText}>DefiSquid cannot recover your wallet should you lose it. You can find your seedphrase in Settings Security & Privacy</Text>
        </View>
    )
}


const ConfirmSeed = () => {
    const seedWords = [
        { id: 1, word: "future" },
        { id: 2, word: "use" },
        { id: 3, word: "abuse" },
        { id: 4, word: "bubble" },
        { id: 5, word: "disagree" },
        { id: 6, word: "yard" },
        { id: 7, word: "exit" },
        { id: 8, word: "enact" },
        { id: 9, word: "drum" },
        { id: 10, word: "frequent" },
        { id: 11, word: "target" },
        { id: 12, word: "organ" }
    ];

    const [blurred, setBlurred] = useState(true);
    const [intensity, setIntensity] = useState(10);
    const [confirmSeedStep, setConfirmSeedStep] = useState(0);
    const [selectedWord, setSelectedWord] = useState("");
    const [selectedId, setSelectedId] = useState(seedWords[0].id);
    const [seed, setSeed] = useState("");
    const [choices, setChoices] = useState<{ id: number; word: string }[]>([]);

    useEffect(() => {
        setIntensity(blurred ? 10 : 0);
    }, [blurred]);

    useEffect(() => {
        if (confirmSeedStep < 3) {
            generateChoices();
        }
    }, [confirmSeedStep]);

    const toggleBlur = () => {
        setBlurred(!blurred);
    };

    const renderTab = (step: number) => {
        const isActive = step <= confirmSeedStep;
        return (
            <TouchableOpacity key={step} style={{ margin: 0, padding: 0, flex: 1, height: 8 }} onPress={() => setConfirmSeedStep(step)}>
                <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar]} />
            </TouchableOpacity>
        );
    };

    const selectWord = (word: string, id: number) => {
        if (id === selectedId) {
            setSelectedWord(word);
            setSeed(word);

            setTimeout(() => {
                setSeed("");
                setConfirmSeedStep(prevStep => prevStep + 1);

                if (confirmSeedStep < 2) {
                    setSelectedId(seedWords[confirmSeedStep + 1].id);
                } else {
                    console.log("Doğru sıralama tamamlandı!");
                }
            }, 1000);
        } else {
            console.log("Yanlış kelime!");
        }
    };

    const generateChoices = () => {
        const correctWord = seedWords[confirmSeedStep];
        const otherWords = seedWords.filter(word => word.id !== correctWord.id);
        const randomChoices = [correctWord, ...otherWords.sort(() => 0.5 - Math.random()).slice(0, 5)];
        setChoices(randomChoices.sort(() => 0.5 - Math.random()));
    };

    return (
        <View style={styles.container}>
            {
                confirmSeedStep < 3 ?
                    <>
                        <View style={styles.title}>
                            <View>
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
                                {[0, 1, 2].map(step => renderTab(step))}
                            </View>
                        </View>
                        {confirmSeedStep < 3 ? (
                            <View style={styles.seedPhrase}>
                                <View style={styles.boxContainer}>
                                    {choices.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => selectWord(item.word, item.id)}>
                                            <View style={styles.box}>
                                                <Text style={styles.boxText}>{item.word}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            null
                        )}
                    </> :
                    <SuccessContent />
            }
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
        gap: 16,
        flexWrap: "wrap"
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
    succesText: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
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
    successText: {
        fontSize: 20,
        color: "green",
        textAlign: "center",
        marginTop: 20,
    },
});

export default ConfirmSeed;
