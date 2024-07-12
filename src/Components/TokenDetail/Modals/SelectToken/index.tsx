import { BlurView } from "expo-blur";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MainContext } from "../../../../Context";
export interface Data {
    coin: string;
    index: number;
}

interface SelectTokenProps {
    setCoinSelect: (coinSelect: boolean) => void;
    coinSelect: boolean;
    onchangeCoin: (coin: Data) => void;
}

const SelectToken: React.FC<SelectTokenProps> = (
    {
        coinSelect,
        setCoinSelect,
        onchangeCoin
    }) => {
    const { coinList, sentAccount } = useContext(MainContext)
    const [selectedCoin, setSelectedCoin] = useState("BNB")
    const [coin, setCoin] = useState<Data>(
        {
            index: 1, coin: "BNB"
        }
    )

    useEffect(() => {
        onchangeCoin({ coin: coin.coin, index: coin.index })
    }, [coin])
    return (
        <Modal
            style={styles.blur}
            visible={coinSelect}
            animationType="slide"
            transparent={true}
        >
            <BlurView intensity={80} style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: "#ABAFC4", height: 4, width: 40, borderRadius: 100, marginBottom: 5 }} />
                    <View style={[styles.modalView, { position: "relative" }]}>
                        <View style={{ paddingBottom: 32 }}>
                            <Text style={styles.modalText}>Token</Text>
                            <Pressable onPress={() => setCoinSelect(false)} style={{ position: "absolute", top: "25%", right: 0 }}>
                                <AntDesign name="close" size={18} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ gap: 8 }}>
                            {
                                coinList.map((coin,index) =>
                                    <Pressable key={index} onPress={() => {
                                        setCoin({ coin: coin.currency, index: coin.id })
                                        setCoinSelect(false)
                                        setSelectedCoin(coin.currency)
                                    }
                                    }
                                        style={{ borderWidth: 2, borderRadius: 8, borderColor: `${coin.currency === selectedCoin ? '#FEBF32' : "transparent"}` }}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                                            <View style={{ alignItems: "flex-start", flexDirection: "row", gap: 8 }}>
                                                <View style={styles.iconContainer}>
                                                </View>
                                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{coin.coinName}</Text>
                                            </View>
                                            <View style={{ gap: 4, }}>
                                                <Text style={{ color: "white", fontSize: 16, lineHeight: 24, fontFamily: "Poppins_500Medium" }}>{parseFloat(sentAccount?.balance[coin.id - 1].balance.toFixed(2))} {sentAccount?.balance[coin.id - 1].coinName}</Text>
                                                <Text style={{ color: "#ABAFC4", fontFamily: "Poppins_500Medium", marginLeft: "auto" }}>
                                                    ${sentAccount?.balance && sentAccount.balance[coin.id - 1] ? parseFloat((sentAccount.balance[coin.id - 1].balance * coin.rate).toFixed(2)) : '0.00'}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>


                                )
                            }
                        </View>

                    </View>
                </View>
            </BlurView>
        </Modal >
    )

}
const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: "#222531",
        overflow: "hidden",
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        width: "100%",
        backgroundColor: "#17171A",
        paddingBottom: 40,
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
        backgroundColor: 'rgb(0,0,0,10)',
    }
})
export default SelectToken