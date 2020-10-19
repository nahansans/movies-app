import React from 'react'
import { View } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import { StackParamsList } from '../references/types/navigation'
import { StackNavigationProp } from '@react-navigation/stack'

type PropsList = {
    navigation: StackNavigationProp<StackParamsList, 'Detail'>
}

const Detail = (props: PropsList) => {
    return (
        <SharedElement id = '1.photo'  >
            <View
                style = {{
                    width: 200,
                    height: 80,
                    backgroundColor: 'grey'
                }}
            />
        </SharedElement>
    )
}

Detail.sharedElements = (route: any, otherRoute:any, showing:any) => {    
    return ['1.photo'];;
}
export default Detail