import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Swiper from 'react-native-swiper';
import PropertyDiversity from '../../../assets/images/PropertyDiversity.svg'
import SafeandConvenients from '../../../assets/images/SafeandConvenient.svg'
import ConvenienTransaction from '../../../assets/images/ConvenientTransaction.svg'
import GradiantText from '../../Components/GradiantText';
import SecondaryButton from '../../Components/Buttons/Secondary';
import PrimaryButton from '../../Components/Buttons/Primary';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        paddingTop: 40,
        paddingBottom: 40,

        justifyContent: "center",
        gap: 10
    },
    swiperContainer: {
        gap: 50,
        paddingLeft: 40
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 8,
        height: 8,
        borderRadius: 5,
        margin: 3,
    },
    activeDot: {
        backgroundColor: '#FEBF32',
        width: 8,
        height: 8,
        borderRadius: 5,
        margin: 3,
    },

})

function Walthought() {
    const walthought = [
        {
            id: 1,
            title: "Property Diversity",
            image: <PropertyDiversity />
        },
        {
            id: 2,
            title: "Safe and Convenient",
            image: <SafeandConvenients style={{ marginBottom: 75 }} />
        },
        {
            id: 3,
            title: "Convenient Transaction",
            image: <ConvenienTransaction style={{ marginBottom: 70 }} />
        },
    ]
    return (
        <View style={styles.container}>
            <Swiper
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {walthought.map((content) => {
                    return (
                        <View style={styles.swiperContainer} key={content.id}>
                            <View style={{ marginTop: 126 }}>
                                {content.image}
                            </View>
                           <GradiantText fontSize={40} lineHeight={56} text={content.title} width={250} row={2}/>
                        </View>
                    )
                })}
            </Swiper>
             <View style={{ paddingLeft: 24, paddingRight: 24 }}>
                <SecondaryButton page='WalletSetUp' text='Get Start'/>
            </View>
        </View>
    );
}

export default Walthought;
