import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'

//images
import { splashImage } from '../Assets/images'

const SplashScreen = ({ navigation }) => {

    //hooks
    useEffect(() => {
        setInterval(() => {
            navigation.navigate('HomeScreen')
        }, 2000)
    })

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }} >
            <StatusBar hidden={true} />
            <Image source={splashImage} />
        </View>
    )
}

export default SplashScreen