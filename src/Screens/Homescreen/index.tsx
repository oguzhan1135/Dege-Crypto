import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Homescreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:"white",fontSize:40}}>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: "center",
        alignItems:"center",
        gap: 10
    },
})
export default Homescreen