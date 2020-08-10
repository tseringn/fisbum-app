import React from 'react'
import {View } from 'react-native'
import {Thumbnail, Text} from 'native-base'
const BestieCard=props=>{
    return(
        <>
        <View>
                <Text>
                    {props.first_name}
                </Text>
                <Thumbnail source={{uri: `${props.img_url}`}}/>
           
        </View>
        </>
    )
}



export default BestieCard