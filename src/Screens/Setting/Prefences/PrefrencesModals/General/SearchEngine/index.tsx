import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from '@expo/vector-icons';

interface SearchEngineProps {
    searchEngineModal: boolean;
    setSearchEngineModal: (searchEngine: boolean) => void;
    onChangeSearchEngine: (searchEngine: string) => void;

}
const SearchEngine: React.FC<SearchEngineProps> = ({
    searchEngineModal,
    setSearchEngineModal,
    onChangeSearchEngine
}) => {

    const [searchEngine, setSearchEngine] = useState([
        "DuckDuckGo",
        "Google",
    ])
    const [selectedSearchEngine, setSelectedSearchEngine] = useState("DuckDuckGo");



    return (
        <Modal
            visible={searchEngineModal}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={styles.modalText}>Base Currency</Text>
                            <Pressable onPress={() => { setSearchEngineModal(false) }} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ gap: 16, paddingBottom: 66 }}>

                            {
                                searchEngine.map((searchEngine, index) =>
                                    <Pressable key={index} onPress={() => {
                                        setSelectedSearchEngine(searchEngine)
                                        onChangeSearchEngine(searchEngine)
                                        setSearchEngineModal(false)
                                    }} style={styles.listItem}>
                                        <Text style={styles.contentTitle}>{searchEngine}</Text>
                                        {
                                            selectedSearchEngine === searchEngine ?
                                                <AntDesign name="checkcircleo" size={20} color="#76E268" /> : null
                                        }

                                    </Pressable>
                                )
                            }




                        </View>


                    </View>

                </View>

            </BlurView>

        </Modal>
    )
}
const styles = StyleSheet.create({

    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 0,
        paddingHorizontal: 24,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontFamily: "Poppins_500Medium",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 24
    },
    blur: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    contentText: {
        fontSize: 14, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "#ABAFC4"
    },
    contentTitle: {
        fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium", color: "white"
    },
    listItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
export default SearchEngine;

