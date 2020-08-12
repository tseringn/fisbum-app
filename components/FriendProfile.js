import React from 'react'
import { MapView} from 'react-native-maps'
import {Modal, View, StyleSheet, ScrollView} from 'react-native' 
import {Icon, Container, Text, Thumbnail, Button} from 'native-base'
import QRCode from 'react-native-qrcode-svg';
import {connect} from 'react-redux'
import RenderMap from './RenderMap'
import * as Linking from 'expo-linking';
import {unfriendAction, removeRequestAction} from '../actions'

const FriendProfile=props=>{
    const friend= props.friends.find(f=>f.my_friend_id==props.id)
  
    const callHandler=()=>{
        let phone_number= props.phone_number.replace(/-/g, "").replace(/' '/g, "").slice(props.phone_number.length-10, props.phone_number.length )
        
        Linking.openURL(`tel:${phone_number}`) 
    }

    const emailHandler=()=>{
        Linking.openURL(`mailto:${props.email}`)
    }

    const unfriendHandler=()=>{
        // alert(`${friend.my_friend_id} =${props.id}`)
        fetch(`http://localhost:3000/api/v1/friends/${friend.id}`, {method: "DELETE"})
         .catch(error=>alert(error))
        
        
        fetch(`http://localhost:3000/api/v1/users/${props.id}`)
        .then(res=>res.json())
        .then(user=>{
            
            if(user.friends.length>0){
            const frd=user.friends.find(f=> f.my_friend_id==props.currentUser.id)
            

            fetch(`http://localhost:3000/api/v1/friends/${frd.id}`, {method: "DELETE"})
            .catch(error=>alert(error))
        }
                props.unfriend(props.id)
                props.removeRequest(props.id)
        })
    
        props.setModalToggle(false)
    }


    const generateQrCode=()=>{
        return(
            <QRCode
            value={`http://localhost:3000/api/v1/users/${props.id}`}
            size={340}
          />
        )
    }
    return(
       <ScrollView>
           <View style={styles.qrView}>
           {generateQrCode()}
           </View>
            <View style={styles.nameView}>
                  
                <View style={styles.profilePicView}>
                    <Thumbnail style={styles.profilePic} square source={{uri: `${props.img_url}`}}/>
                </View> 
                <View style={styles.textView}>
                        
                    <Text>
                        {props.first_name} {props.last_name}
                    </Text>
                    <Text note numberOfLines={3} >
                        {props.bio} 
                    </Text>
                    <Text>
                    Level {friend.friendship_score}
                     </Text>
                    </View>
            </View>
            <View style={styles.statusView}>
                <Text style={styles.statusText}>
                    {props.status}
                </Text>
            </View> 
            <View style={styles.buttonView}>
                <Button  transparent  bordered small onPress={callHandler}>
                    <Text>
                        Call    
                    </Text>
                    <Icon name="call" style={{marginLeft: -5}}/>      
                </Button>
                <Button transparent bordered small onPress={emailHandler}>
                    <Text>Email</Text>
                    <Icon name="mail"/>
                 </Button>
                 <Button bordered small transparent onPress={unfriendHandler}>
                     <Text> Unfriend</Text>
                </Button>
            </View>
           <RenderMap id={props.id}/>
        </ScrollView>
    )
}


const styles=StyleSheet.create({
    qrView:{
        margin: 10,
        
    },
    profilePic: {
        width: 100,
        height: 100,
        backgroundColor: 'white', 
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 10,
    }, 
    profilePicView: {
        marginLeft: 15, 
        marginTop: -30,
       
    },
    nameView:{
        flexDirection: 'row',
        justifyContent: "flex-start",
        
    },
    statusView: {
        margin: 10,
        borderRightColor: 'grey',
        borderLeftColor: 'grey',
        borderRightWidth: .5,
        borderLeftWidth: .5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',

    },
    textView: {
        marginLeft: 10,
        maxWidth: '60%'
    },
    statusText: {
        marginHorizontal: 5
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

const msp=state=>{
    return{
        currentUser: state.currentUser,
        friends: state.currentUser.friends
    }
}
const mdp=dispatch=>{
    return{
        unfriend: (id)=>dispatch(unfriendAction(id)), 
        removeRequest: (id)=>dispatch(removeRequestAction(id))
    }
}
export default connect(msp, mdp)(FriendProfile)