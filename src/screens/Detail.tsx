import React, { useEffect, useRef, useState } from 'react'
import { View, Image, Text, Dimensions, ScrollView, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'

import { SharedElement } from 'react-navigation-shared-element'

import { StackParamsList } from '../references/types/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useNavigation } from '@react-navigation/core'

import { API_KEY, POSTER_URL,BASE_URL } from '../references/API'
import { Fonts } from './../references/Fonts';
import { moviesType } from '../references/types/moviesType'
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler'
import AnimatedTouchable from '../components/AnimatedTouchable'

type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'Detail'>
    route: RouteProp<StackParamsList, 'Detail'>
}

const { Montserrat } = Fonts
const SubText = (props: { title?:any, desc?: any }) => {
    return (
        <Text
            style = {{
                color: '#FFF',
                fontSize: 14,
                textAlign: 'left',
                fontFamily: Montserrat.Regular,
                marginTop: 10
            }}
        >
            <Text style = {{ fontFamily: Montserrat.SemiBold }} >{props.title} : </Text>
            <Text style = {{ fontFamily: Montserrat.Regular }} >{props.desc}</Text>
        </Text>
    )
}


const Detail = (props: PropsList) => {
    const {width} = Dimensions.get('window')
    const { navigation, route } = props
    const { item } = route.params

    const [movie, setMovie] = useState({} as moviesType)
    const [similarMovies, setSimilarMovies] = useState([] as moviesType[])
    const opacity = useRef(new Animated.Value(0)).current
    const scrollX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        getMovie()
    }, [])

    const getMovie = () => {
        fetch(`${BASE_URL}/movie/${item.id}${API_KEY}`)
        .then(res => res.json())
        .then(resJSON => {
            setMovie(resJSON)
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start()
            getSimilarMovies()
        })
    }

    const getSimilarMovies = () => {
        fetch(`${BASE_URL}/movie/${item.id}/similar${API_KEY}`)
        .then(res => res.json())
        .then(resJSON => {
            setSimilarMovies(resJSON.results)
        })
        .catch(error => {
            console.warn(error)
        })
    }

    return (
        <ScrollView
            style = {{
                backgroundColor: 'black',
            }}
        >
            <View style = {{ flex: 1, backgroundColor: 'black',width, padding: 15}} >
                <TouchableOpacity onPress = {() => {navigation.goBack()}} >
                    <Icon name="arrow-back-outline" size={27} color="white" />
                </TouchableOpacity>
                <SharedElement id={`${item.id}.shareItem`} >
                    <>
                    <Image
                        resizeMode='contain'
                        source = {{uri: `${POSTER_URL}/${item.poster_path}`}}
                        style = {{
                            // resizeMode: 'contain',
                            width: 148,
                            height: 222.4,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 15
                        }}
                    />
                    </>
                </SharedElement>
                <Animated.View
                    style = {{
                        opacity
                    }}
                >
                    <Text
                        style = {{
                            color: '#FFF',
                            fontSize: 27,
                            textAlign: 'center',
                            fontFamily: Montserrat.SemiBold,
                            marginTop: 10
                        }}
                    >
                        {movie.title}
                    </Text>
                    <Text
                        style = {{
                            color: '#303030',
                            fontSize: 14,
                            textAlign: 'center',
                            fontFamily: Montserrat.Regular,
                            marginTop: 10,
                            borderRadius: 50,
                            backgroundColor: '#f1c40f',
                            alignSelf: 'center',
                            paddingHorizontal: 5,
                            paddingVertical: 15
                        }}
                    >
                        <Text style = {{ fontSize: 27 }} >{movie.vote_average}</Text>
                        <Text> /10</Text>
                    </Text>
                    <Text
                        style = {{
                            color: '#FFF',
                            fontSize: 14,
                            textAlign: 'justify',
                            fontFamily: Montserrat.Regular,
                            marginTop: 10
                        }}
                    >
                        {movie.overview}
                    </Text>
                    <SubText title="Status" desc = {movie.status} />
                    <SubText title = "Language" desc = {movie.original_language} />
                    <SubText title = "Duration Movie" desc = {`${movie.runtime} minutes`} />
                    <SubText title = "Release Date" desc = {movie.release_date} />
                    <Text
                        style = {{
                            color: '#FFF',
                            fontSize: 14,
                            textAlign: 'left',
                            fontFamily: Montserrat.Regular,
                            marginTop: 10
                        }}
                    >
                        <Text style = {{ fontFamily: Montserrat.SemiBold }} >Genre : </Text>
                        {
                            (movie.genres || []).map((item, index) => {
                                return (
                                <Text key ={index} style = {{ fontFamily: Montserrat.Regular }} >{item.name}{index + 1 != movie.genres?.length ? ', ' : '' }</Text>
                                )
                            })
                        }
                    </Text>
                    
                    <Text
                        style = {{
                            color: '#FFF',
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: Montserrat.SemiBold,
                            marginVertical: 15
                        }}
                    >
                        Similar Movies
                    </Text>
                    {
                        similarMovies.length != 0 ?
                        <Animated.FlatList
                            data = {similarMovies}
                            keyExtractor = {(item, index) => String(index)}
                            horizontal
                            showsVerticalScrollIndicator = {false}
                            scrollEventThrottle = {16}
                            onScroll = {Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true },
                            )}
                            renderItem = {({item, index}) => {
                                
                                return (
                                    <AnimatedTouchable
                                        onPress = {() => navigation.push('Detail', {item})}
                                        style = {{
                                            width: 133.2,
                                            marginRight: index + 1 != similarMovies.length ? 10 : 0
                                        }}
                                        activeScale = {0.95}
                                    >
                                        <SharedElement id={`${item.id}.shareItem`} >
                                            <>
                                            <Image
                                                resizeMode='contain'
                                                source = {{uri: `${POSTER_URL}/${item.poster_path}`}}
                                                style = {{                                                
                                                    width: 133.2,
                                                    height: 200.16,
                                                    borderRadius: 10,
                                                    alignSelf: 'center'
                                                }}
                                            />
                                            </>
                                        </SharedElement>
                                        <Text
                                            style = {{
                                                color: '#FFF',
                                                fontSize: 14,
                                                textAlign: 'center',
                                                fontFamily: Montserrat.Regular,
                                                marginTop: 10
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </AnimatedTouchable>
                                )
                            }}
                        />
                        :
                        <ActivityIndicator color='white' style = {{alignSelf: 'center'}} />
                    }
                </Animated.View>

            </View>
        </ScrollView>
    )
}

Detail.sharedElements = (route: any, otherRoute:any, showing:any) => {    
    const {item} = route.params
    return [`${item.id}.shareItem`]
}
export default Detail