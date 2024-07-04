import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Share } from 'react-native';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppNavigation } from '../../../Router/useAppNavigation';
import HomeShape from '../../../../assets/images/HomeShape.svg';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TabBar from '../../../Components/TabBar';
import General from './PrefrencesModals/General';
const Preferences = () => {

    const navigation = useAppNavigation();
    const [generalModal, setGeneralModal] = useState(false)

    return (
        <>
            <View style={styles.container}>
                <HomeShape style={{ position: "absolute", right: 0, top: "5%", transform: [{ scale: 1 }] }} />
                <View style={{ alignItems: "center", paddingBottom: 0, position: "relative" }}>
                    <Pressable onPress={() => navigation.navigate("Onboarding", { screen: "Setting" })} style={{ position: "absolute", left: 0 }}>
                        <AntDesign name="left" size={16} color="white" />
                    </Pressable>
                    <Text style={styles.title}>Preferences</Text>
                </View>
                <View style={{ gap: 0 }}>
                    <BlurView intensity={10} style={{ padding: 0 }}>
                        <Pressable onPress={() => setGeneralModal(true)} style={styles.listItem}>
                            <View style={{ flexDirection: "column", gap: 4 }}>
                                <Text style={styles.title}>General</Text>
                                <Text style={styles.text}>Currency conversion, primary currency, language and search engine</Text>
                            </View>
                            <Entypo name="chevron-right" size={18} color="white" />
                        </Pressable>
                    </BlurView>
                    <General
                        setGeneralModal={setGeneralModal}
                        generalModal={generalModal}
                    />

                    <Pressable style={styles.listItem}>
                        <View style={{ flexDirection: "column", gap: 4 }}>
                            <Text style={styles.title}>Security & Privacy</Text>
                            <Text style={styles.text}>Privacy settings, private key and wallet seed phrase</Text>
                        </View>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </Pressable>

                    <Pressable style={styles.listItem}>
                        <View style={{ flexDirection: "column", gap: 4 }}>
                            <Text style={styles.title}>Advanced</Text>
                            <Text style={styles.text}>Access developer features, reset account, setup testnets, sync extension, state logs,...</Text>
                        </View>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </Pressable>

                    <Pressable style={styles.listItem}>
                        <View style={{ flexDirection: "column", gap: 4 }}>
                            <Text style={styles.title}>Contacts</Text>
                            <Text style={styles.text}>Add, edit, remove, and manage your accounts</Text>
                        </View>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </Pressable>

                    <Pressable style={styles.listItem}>
                        <View style={{ flexDirection: "column", gap: 4 }}>
                            <Text style={styles.title}>Networks</Text>
                            <Text style={styles.text}>Add and edit custom RPC networks</Text>
                        </View>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </Pressable>
                    <Pressable style={styles.listItem}>
                        <View style={{ flexDirection: "column", gap: 4 }}>
                            <Text style={styles.title}>Experimental</Text>
                            <Text style={styles.text}>About DeGe</Text>
                        </View>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </Pressable>


                </View>
            </View >
            <TabBar />

        </>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 100,
        paddingBottom: 40,
        gap: 24,
        position: "relative",
        paddingHorizontal: 24
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        lineHeight: 24,
        color: "white"
    },
    text: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        lineHeight: 18,
        color: "#ABAFC4",
        maxWidth: 260
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 8
    }
});

export default Preferences;
