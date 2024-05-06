import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Shape from '../../../assets/images/Shape.svg'
import Logo from '../../../assets/images/DegeLogo.svg'
import { useAppNavigation } from '../../Router/useAppNavigation';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        flexDirection: "column",

    },
    shape: {
        alignItems: "flex-end"
    },
    shapeImage: {
        marginBottom: 85
    },
    frontContainer: {
        alignItems: "flex-start",
        paddingLeft: 40,
        gap: 40
    },
    slashText: {
        fontSize: 42,
        lineHeight: 56,
        maxWidth: 300,
        color: 'white'
    }


});

const SlashPage = () => {
    const navigation = useAppNavigation();

    setTimeout(() => {
        navigation.navigate("Onboarding", {
            screen: "Walthought",
        })
    }, 500);

    return (
        <View style={styles.container}>
            <View style={styles.shape}>
                <Shape style={styles.shapeImage} />
            </View>
            <View style={styles.frontContainer}>
                <Logo />
                <Text style={styles.slashText}>
                    Millions of people participate
                </Text>
            </View>
        </View>
    );
}

export default SlashPage;