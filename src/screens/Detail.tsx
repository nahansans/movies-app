import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import { StackParamsList } from '../references/types/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { POSTER_URL } from '../references/API'
import { Fonts } from './../references/Fonts';
import { RouteProp, useNavigation } from '@react-navigation/core'


type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'Detail'>
    route: RouteProp<StackParamsList, 'Detail'>
}

const Detail = (props: PropsList) => {
    const {width} = Dimensions.get('window')
    const { navigation, route } = props
    const { Montserrat } = Fonts
    return (
        <View style = {{ flex: 1, backgroundColor: 'black', padding: 10, width}} >
            <SharedElement id={`${route.params.item.id}.shareItem`} >
                <>
                <Image
                    // resizeMode='contain'
                    source = {{uri: `${POSTER_URL}/${route.params.item.poster_path}`}}
                    style = {{
                        // resizeMode: 'contain',
                        width: 150,
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
                    {route.params.item.title}
                </Text>
                </>
            </SharedElement>
        </View>
    )
}

Detail.sharedElements = (route: any, otherRoute:any, showing:any) => {    
    const {item} = route.params
    return [`${item.id}.shareItem`]
}
export default Detail