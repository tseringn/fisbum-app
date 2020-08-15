import React from 'react'
import {View , StyleSheet} from 'react-native'
import {Thumbnail, Text} from 'native-base'
const BestieCard=props=>{
    return(
        
        <View>
                <Text>
                    {props.first_name}
                </Text>
               <View style={styles.bestieView}>
                   <Thumbnail source={{uri: `${props.img_url}`}}/>
                </View> 
           
        </View>
       
    )
}

const styles=StyleSheet.create({
    bestieView: {
        shadowColor: 'rgb(0,234,222)',
        textShadowOffset: {
            with: 3, 
            height:3
        },
        shadowRadius: 2,
        shadowOpacity: 1

    }
})



export default BestieCard