import React, {useEffect, useState, useRef} from 'react'
import { 
    View, 
    TouchableOpacity, 
    Image, 
    Text, 
    FlatList, 
    Animated, 
    Platform,
    Dimensions,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import { StackNavigationProp } from '@react-navigation/stack'

import { StackParamsList } from '../references/types/navigation'
import { moviesType } from '../references/types/moviesType'

import { API_KEY, BASE_URL, POSTER_URL } from './../references/API';
import LinearGradient from 'react-native-linear-gradient'
import { Fonts } from './../references/Fonts';

type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'Home'>
}

const Home = (props: PropsList) => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
    const {Montserrat,OpenSans} = Fonts

    useEffect(() => {
        getMoviesPopulars()
    }, [])
    const scrollX = useRef(new Animated.Value(0)).current
    const [moviesPopulars, setMoviesPopulars] = useState([] as moviesType[])

    const getMoviesPopulars = () => {
        fetch(`${BASE_URL}/movie/popular/${API_KEY}`)
        .then(res => res.json())
        .then(resJSON => {
            setMoviesPopulars(resJSON.results)
        })
    }
    return (
        <ScrollView>
            <View style = {{ flex: 1, height }} >
                <Animated.FlatList
                    data = {moviesPopulars}
                    keyExtractor = {(item, index) => String(index)}
                    horizontal
                    pagingEnabled
                    showsVerticalScrollIndicator = {false}
                    scrollEventThrottle = {16}
                    onScroll = {Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true },
                    )}
                    renderItem = {({item, index}) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ]

                        const opacity = scrollX.interpolate({
                            inputRange,                            
                            outputRange: [0, 1, 0],
                        })
                        const translateX = scrollX.interpolate({
                            inputRange,                            
                            outputRange: [width * 0.75, 0, -width * 0.75],
                        })
                        return (
                            <View
                                style = {{
                                    backgroundColor: 'black',
                                    width,
                                    height
                                }}
                            >
                                <Animated.Image
                                    source = {{uri: `${POSTER_URL}${item.backdrop_path}`}}
                                    style = {{
                                        position: 'absolute',
                                        top: 0, left: 0, bottom: 0, right: 0,
                                        opacity
                                    }}
                                />
                                <LinearGradient
                                    colors = {['rgba(0,0,0,0)', 'black']}
                                    style = {{
                                        position: 'absolute',
                                        top: 0, left: 0, bottom: 0, right: 0
                                    }}
                                />
                                <Animated.View
                                    style = {{
                                        position: 'absolute',
                                        bottom: 30,
                                        alignSelf: 'center',
                                        width: width * 0.75,
                                        opacity,
                                        transform: [{translateX}]
                                    }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        source = {{uri: `${POSTER_URL}/${item.poster_path}`}}
                                        style = {{
                                            width: 180,
                                            height: 200,
                                            borderRadius: 10,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Text
                                        style = {{
                                            color: '#FFF',
                                            fontSize: 27,
                                            textAlign: 'center',
                                            fontFamily: Montserrat.SemiBold,
                                            marginTop: 10
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        numberOfLines = {3}
                                        style = {{
                                            color: '#FFF',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            fontFamily: Montserrat.Regular,
                                            marginTop: 10
                                        }}
                                    >
                                        {item.overview}
                                    </Text>
                                </Animated.View>
                            </View>
                        )
                    }}
                />
            </View>
            <Text>OKe</Text>
        </ScrollView>
    )
}

export default Home