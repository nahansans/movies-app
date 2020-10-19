import React from 'react'
import { View, Pressable, Animated, PressableProps, ViewProps, ViewStyle } from 'react-native'

type PropsList = {
    activeScale: number,
    durationIn?: number,
    durationOut?: number,
    style?: ViewStyle,
    onPress: () => void,
}

export default class  extends React.Component<PropsList, {}> {
    state = {
        scale: new Animated.Value(1)
    }
    render() {
        const { children, activeScale, durationIn, durationOut ,onPress, style } = this.props
        const { scale } = this.state
        return (
            <Animated.View style = {{ transform: [{scale}] }} >
                <Pressable
                    onPress = {() => onPress()}
                    onPressIn = {() => {
                        Animated.timing(scale, {
                            toValue: activeScale,
                            duration: durationIn != undefined ? durationIn : 200,
                            useNativeDriver: true
                        }).start()
                    }}
                    onPressOut = {() => {
                        Animated.timing(scale, {
                            toValue: 1,
                            duration: durationOut != undefined ? durationOut : 200,
                            useNativeDriver: true
                        }).start()
                    }}
                    style = {style}
                >
                    {children}
                </Pressable>
            </Animated.View>
        )
    }
}