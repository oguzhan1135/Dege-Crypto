import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import PropertyDiversity from '../../../assets/images/PropertyDiversity.svg'
import SafeandConvenients from '../../../assets/images/SafeandConvenient.svg'
import ConvenienTransaction from '../../../assets/images/ConvenientTransaction.svg'
import OperationButton from '../../Components/Buttons/OperationButton';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17171a',
        padding: 40,
        justifyContent: "center",
        gap: 10
    },
    swiperContainer: {
        gap: 50,
        height: 200,
    },
    title: {
        fontSize: 40,
        lineHeight: 56,
        maxWidth:250
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
            image: <SafeandConvenients style={{marginBottom:75}}/>
        },
        {
            id: 3,
            title: "Convenient Transaction",
            image: <ConvenienTransaction style={{marginBottom:70}}/>
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
                            <View style={{marginTop:126}}>
                                {content.image}
                            </View>
                            <MaskedView maskElement={<Text style={styles.title}>{content.title}</Text>}>
                                <LinearGradient 
                                    colors={['#A9CDFF', '#72F6D1', '#A0ED8D', '#FED365', '#FAA49E']}
                                    locations={[0, 0.22, 0.56, 0.82, 1]}
                                    style={styles.gradient}
                                >
                                    <Text style={{ opacity: 0 }}>{content.title}</Text>
                                </LinearGradient>
                            </MaskedView>
                        </View>
                    )
                })}
            </Swiper>
            <OperationButton textActive={true} containerActive={false} title='Get Started' />
        </View>
    );
}

export default Walthought;
