import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppNavigation } from '../../Router/useAppNavigation';
import WalletsetUp from '../../../assets/images/WalletSetUp.svg'
import PrimaryButton from '../../Components/Buttons/Primary';
import GradiantText from '../../Components/GradiantText';
import SecondaryButton from '../../Components/Buttons/Secondary';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: "center",
        gap: 10
    },
    buttonArea: {
        gap: 16,
        paddingLeft:24,
        paddingRight:24
    },
    gradiantText: {
        paddingLeft: 24,
        paddingBottom: 30,
        paddingTop: 83
    }

})

function WalletSetUp() {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", paddingBottom: 0 }}>
                <WalletsetUp />
            </View>

            <View style={styles.gradiantText}>
                <GradiantText fontSize={40} lineHeight={56} text='Wallet setup' width={250} row={1} />
            </View>


            <View style={styles.buttonArea}>
                <SecondaryButton page='ImportSeed' text='Import Using Seed Phrase' />
                <PrimaryButton page='CreateNewWallet' text='Create a New Wallet' />
            </View>


        </View>
    );
}

export default WalletSetUp;