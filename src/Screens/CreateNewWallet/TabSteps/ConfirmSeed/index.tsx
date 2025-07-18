import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GradiantText from "../../../../Components/GradiantText";
import { useAppNavigation } from "../../../../Router/useAppNavigation";

interface ConfirmSeedProp {
  onChangeConfirm: (confirm: boolean) => void;
}

const SuccessContent = () => {
  return (
    <View style={{ justifyContent: "center", alignContent: "center", gap: 24 }}>
      <View style={[styles.title, { paddingTop: 100, paddingBottom: 40 }]}>
        <View>
          <GradiantText text={"Success!"} fontSize={40} lineHeight={56} width={300} row={1} />
        </View>
      </View>
      <Text style={styles.successText}>
        You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
      </Text>
      <Text style={styles.successText}>
        DefiSquid cannot recover your wallet should you lose it. You can find your seedphrase in Settings Security & Privacy
      </Text>
    </View>
  );
};

const ConfirmSeed: React.FC<ConfirmSeedProp> = ({ onChangeConfirm }) => {
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

  const [confirmSeedStep, setConfirmSeedStep] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedId, setSelectedId] = useState(seedWords[0].id);
  const [seed, setSeed] = useState("");
  const [choices, setChoices] = useState<{ id: number; word: string }[]>([]);
  const [wrongCount, setWrongCount] = useState(3);
  const navigation = useAppNavigation();

  useEffect(() => {
    console.log("Generating choices for step:", confirmSeedStep);
    generateChoices();
  }, [confirmSeedStep]);

  const renderTab = (step: number) => {
    const isActive = step <= confirmSeedStep;
    return (
      <TouchableOpacity key={step} style={{ margin: 0, padding: 0, flex: 1, height: 8 }} onPress={() => setConfirmSeedStep(step)}>
        <View style={[isActive ? styles.activeTabBar : styles.inactiveTabBar]} />
      </TouchableOpacity>
    );
  };

  const selectWord = (word: string, id: number) => {
    console.log("Selected word:", word, "Selected ID:", id, "Expected ID:", selectedId);
    if (id === selectedId) {
      setSelectedWord(word);
      setSeed(word);

      setTimeout(() => {
        setSeed("");
        setConfirmSeedStep(prevStep => {
          const newStep = prevStep + 1;
          if (newStep < 3) {
            setSelectedId(seedWords[newStep].id);
          }
          return newStep;
        });
      }, 1000);
    } else {
      setWrongCount(prevCount => {
        const newCount = prevCount - 1;
        if (newCount === 0) {
          setTimeout(() => {
            navigation.navigate("Onboarding", { screen: "WalletSetUp" });
          }, 2500);
        }
        return newCount;
      });
    }
  };

  useEffect(() => {
    if (confirmSeedStep >= 3) {
      onChangeConfirm(true);
    }
  }, [confirmSeedStep]);

  const generateChoices = () => {
    const correctWord = seedWords[confirmSeedStep];
    const otherWords = seedWords.filter(word => word.id !== correctWord.id);
    const randomChoices = [correctWord, ...otherWords.sort(() => 0.5 - Math.random()).slice(0, 5)];
    setChoices(randomChoices.sort(() => 0.5 - Math.random()));
  };

  return (
    <View style={styles.container}>
      {confirmSeedStep < 3 ? (
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
          {wrongCount <= 0 ? (
            <View style={{ backgroundColor: "#301c1c", borderRadius: 10, padding: 10 }}>
              <Text style={{ color: "red", fontSize: 16, lineHeight: 30, fontFamily: "Poppins_500Medium" }}>
                Sorry. You have expired by making 3 wrong choices. You are directed to the login page...
              </Text>
            </View>
          ) : (
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
          )}

          <Text style={{ textAlign: "center", paddingTop: 20, fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white" }}>
            Your remaining guess:{" "}
            <Text style={{ textAlign: "center", paddingTop: 20, fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: `${wrongCount < 3 ? "red" : "green"}` }}>
              {wrongCount}
            </Text>
          </Text>
        </>
      ) : (
        <SuccessContent />
      )}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingTop: 75,
    paddingHorizontal: 96,
    paddingBottom: 30
  },
  container: {
    justifyContent: "center"
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
    textAlign: "center",
    fontFamily: "Poppins_500Medium"
  },
  successText: {
    color: "white",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Poppins_500Medium"
  },
  boxText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Poppins_500Medium",
    color: "white"
  },
  activeTabBar: {
    borderRadius: 2,
    height: 8,
    backgroundColor: "#FFD505"
  },
  inactiveTabBar: {
    borderRadius: 2,
    height: 8,
    backgroundColor: "#222531"
  }
});

export default ConfirmSeed;
