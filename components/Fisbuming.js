import React from 'react'
import {View} from 'react-native'
import {  Button,  List, ListItem, Thumbnail, Text } from 'native-base'; 
const Fisbuming=props=>{
    return(
        <List>
        <ListItem>
            <View>
                <View>
                    <View>
                            <Text>{props.first_name}</Text>
                            <Text note>@{props.username}</Text>
                        </View>
                    <View >
                        <Thumbnail source={{uri: `${props.img_url}`}}/>
                        <Text note > {props.bio}</Text>
                    </View> 
                    <View >
                        <Text note > {props.fisbum_count}</Text>
                        <Text note > {props.fisbum_count}</Text>
                    </View>
                </View>
            </View>
        </ListItem>
    </List>
    )
}

export default Fisbuming