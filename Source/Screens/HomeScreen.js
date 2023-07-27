import { View, Text, StatusBar, TouchableOpacity, Image, ToastAndroid, FlatList, ImageBackground } from 'react-native'
import React, { useState } from 'react'

//PanResponder
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

//images
import { actionIcon, catIcon, catIcon2, codeIcon, playIcon, resetIcon, scratchIcon, speechBubble } from '../Assets/images'

//codeData
import { Code } from '../Data'

const HomeScreen = () => {


    //hooks
    const [clone, setClone] = useState(false)
    const [greet, setGreet] = useState(false)
    const [costume, setCostume] = useState(false)
    const [size, setSize] = useState(75)
    const [animation, setAnimation] = useState(false)


    //initial values
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const rotate = useSharedValue(0)
    const animatedValue = useSharedValue(0);


    //handling panGestureEvents
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX
            translateY.value = event.translationY + context.translateY
        },
        onEnd: () => {
            console.log("----------")
            console.log(translateX.value, "x")
            console.log(translateY.value, "y")
            if (translateY.value > 170 || translateX.value > 215) {
                translateX.value = 0
                translateY.value = 0
            } else if (translateY.value < -170 || translateX.value < -215) {
                translateX.value = 0
                translateY.value = 0
            }
        },
    })


    //for animation from left to right
    function animate() {
        animatedValue.value = withTiming(1, { duration: 2000 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        const xValue = animatedValue.value * 100
        return {
            transform: [{ translateX: xValue }],
        };
    });


    //panAnimation
    const panAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate.value}deg` }]
        }
    })


    //resetButton
    const handleReset = () => {
        translateX.value = 0
        translateY.value = 0
        rotate.value = 0
        setSize(75)
        setAnimation(false)
        animatedValue.value = 0
    }


    //playButton
    const handlePlay = () => {
        ToastAndroid.show('Please select actions', ToastAndroid.SHORT)
    }


    //flatList renderingItems
    const RenderItem = ({ title, color, code1, code2, code3 }) => {
        return (
            <View style={{ margin: 5 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{ height: 20, width: 20, borderRadius: 50, backgroundColor: color }} />
                    <Text style={{ letterSpacing: 0.5, lineHeight: 16, fontWeight: 'bold', marginStart: 5, color: 'black' }} >{title}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (code1.type == 'motion') {
                            translateX.value += 10
                        } else if (code1.type == 'looks') {
                            setGreet(true)
                            setInterval(() => {
                                setGreet(false)
                            }, 1000)
                        } else if (code1.type == 'controls') {
                            setClone(true)
                        } else if (code1.type = 'events') {
                            setAnimation(true)
                            animate()
                        }
                    }}
                    activeOpacity={0.5}
                    style={{ backgroundColor: color, borderRadius: 5, borderWidth: 0.5, borderColor: '', marginTop: 5 }}>
                    <Text style={{ letterSpacing: 0.5, lineHeight: 16, fontWeight: '500', marginStart: 2, padding: 5, color: 'white' }} >{code1.move}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (code1.type == 'motion') {
                            rotate.value += 20
                        } else if (code1.type == 'looks') {
                            setCostume(!costume)
                        } else if (code1.type == 'controls') {
                            setClone(false)
                        } else if (code1.type = 'events') {
                        }
                    }}
                    activeOpacity={0.5}
                    style={{ backgroundColor: color, borderRadius: 5, borderWidth: 0.5, borderColor: '', marginTop: 5 }}>
                    <Text style={{ letterSpacing: 0.5, lineHeight: 16, fontWeight: '500', marginStart: 2, padding: 5, color: 'white' }} >{code2.move}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (code1.type == 'motion') {
                            translateX.value = 100
                            translateY.value = 100
                        } else if (code1.type == 'looks') {
                            setSize(size + 10)
                        } else if (code1.type == 'controls') {
                            setClone(false)
                        } else if (code1.type = 'events') {
                        }
                    }}
                    activeOpacity={0.5}
                    style={{ backgroundColor: color, borderRadius: 5, borderWidth: 0.5, borderColor: '', marginTop: 5 }}>
                    <Text style={{ letterSpacing: 0.5, lineHeight: 16, fontWeight: '500', marginStart: 2, padding: 5, color: 'white' }} >{code3.move}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (

        <GestureHandlerRootView style={{ width: '100%', height: '90%', flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(77,151,255,.25)', padding: 5 }}>

            <StatusBar hidden={true} />

            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }} >


                {/* CodeTab */}
                <View style={{ backgroundColor: 'white', height: '95%', width: '30%', borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginEnd: '10%' }}>

                    <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                        <Image source={codeIcon} />
                        <Text style={{ letterSpacing: 0.5, lineHeight: 16, fontWeight: 'bold', marginStart: 5, color: 'black' }}>Code</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: 'grey' }} />

                    <FlatList
                        style={{ marginBottom: 3 }}
                        showsVerticalScrollIndicator={false}
                        data={Code}
                        renderItem={
                            ({ item }) => <RenderItem
                                title={item.type}
                                color={item.color}
                                code1={item.code[0]}
                                code2={item.code[1]}
                                code3={item.code[2]}
                            />
                        } />

                </View>

                {/* PanResponder */}
                <View style={{ flexDirection: 'column', width: '50%', justifyContent: "space-evenly" }}>

                    {/* view for panResponder */}
                    <View style={{ backgroundColor: 'white', height: '78%', borderRadius: 5, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center', }}>

                        <PanGestureHandler onGestureEvent={panGestureEvent}>

                            <Animated.View style={animation ? animatedStyle : panAnimation} >

                                {clone ? <Image style={{ height: size, width: size }} source={catIcon} /> : null}

                                <Image style={{ height: size, width: size }} source={costume ? catIcon2 : catIcon} />

                                {greet ? <ImageBackground style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32, zIndex: 1, marginTop: -70, right: -65 }} source={speechBubble} >
                                    <Text style={{ color: 'white', fontSize: 10 }} >Hi</Text>
                                </ImageBackground> : null}

                            </Animated.View>

                        </PanGestureHandler>

                    </View>

                    {/* panResponder desc */}
                    <View style={{ backgroundColor: 'white', height: '15%', borderRadius: 5, borderWidth: 1, borderColor: 'grey', justifyContent: "center", marginTop: 5 }}>

                        <View style={{ flexDirection: "row", alignItems: 'center' }} >

                            <TouchableOpacity
                                onPress={handleReset}
                                activeOpacity={0.5}
                                style={{ width: 33, height: 33, alignItems: 'center', justifyContent: 'center', marginStart: 10 }} >
                                <Image source={resetIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handlePlay}
                                activeOpacity={0.5}
                                style={{ width: 33, height: 33, alignItems: 'center', justifyContent: 'center', marginStart: 10 }}>
                                <Image source={playIcon} />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </View>

        </GestureHandlerRootView>
    )
}

export default HomeScreen