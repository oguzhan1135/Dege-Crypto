import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from "expo-blur";
import { FontAwesome5 } from '@expo/vector-icons';
const Network = () => {
    const font = "Poppins_500Medium"
    let [network, setNetwork] = useState(
        {
            id: 1,
            networkName: "Etherium Main",
            color: "#FEBF32"
        },

    )
    let [otherNetworks, setOtherNetworks] = useState([
        {
            id: 2,
            networkName: "Ropsten Test",
            color: "#EA3943"
        },
        {
            id: 3,
            networkName: "Kovan Test",
            color: "#45F0D1"
        },
        {
            id: 4,
            networkName: "Goerli Test",
            color: "#5F97FF"
        },
    ])
    const handleChangeNetwork = (selectedId: number, selectedNetwork: string, selectedColor: string) => {
        let newOtherNetwork = {
            id: network.id,
            networkName: network.networkName,
            color: network.color
        }
        let newOtherNetworkList = otherNetworks.filter((network) => network.id !== selectedId)
        newOtherNetworkList.push(newOtherNetwork)
        setOtherNetworks(newOtherNetworkList);


        setNetwork({ id: selectedId, networkName: selectedNetwork, color: selectedColor })
        setModalVisible(false)
    }
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.networkButton}>
                <Text style={styles.networkButtonText}>{network.networkName}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="white" />
            </Pressable>

            <Modal
                style={styles.blur}
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <BlurView intensity={80} style={{ flex: 1 }}>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Network</Text>
                            <View style={{ gap: 24 }}>
                                <View style={styles.network}>
                                    <View style={{ gap: 18, alignItems: "center", flexDirection: "row" }}>
                                        <View style={{ height: 12, width: 12, borderRadius: 100, backgroundColor: `${network.color}` }} />
                                        <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>{network.networkName}</Text>
                                    </View>
                                    <FontAwesome5 name="check-circle" size={24} color="#76E268" />
                                </View>

                                <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_700Bold", fontSize: 16 }}>Other Network</Text>

                                {otherNetworks.map((otherNetworks) =>
                                    
                                        <Pressable key={otherNetworks.id} onPress={()=> handleChangeNetwork(otherNetworks.id,otherNetworks.networkName,otherNetworks.color)} style={styles.network}>
                                            <View key={otherNetworks.id} style={{ gap: 18, alignItems: "center", flexDirection: "row" }}>
                                                <View style={{ height: 12, width: 12, borderRadius: 100, backgroundColor: `${otherNetworks.color}` }} />
                                                <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>{otherNetworks.networkName}</Text>
                                            </View>
                                        </Pressable>
                                )}

                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Text style={{ color: "#FEBF32", fontFamily: "Poppins_700Bold" }}>Close</Text>
                                </Pressable>
                            </View>


                        </View>

                    </View>
                </BlurView>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    network: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "space-between"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    networkButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 12,
    },
    networkButtonText: {
        color: "white",
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "Poppins_500Medium"
    },
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        gap: 45,
        paddingBottom: 40,
        paddingHorizontal: 24
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 16,
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
        backgroundColor: 'rgb(0,0,0,10)',
    },
})

export default Network;