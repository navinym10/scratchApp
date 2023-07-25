import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SplashScreen = ({ navigation }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} >
                <Text>SplashScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen