import React from 'react'
import { MapView} from 'react-native-maps'
import {Image, View, StyleSheet, ScrollView} from 'react-native' 
import {Icon, Container, Text, Thumbnail, Button} from 'native-base'
import QRCode from 'react-native-qrcode-svg';
import {connect} from 'react-redux'
import RenderMap from './RenderMap'
import * as Linking from 'expo-linking';
import {unfriendAction, removeRequestAction} from '../actions'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import DisplayImage from './DisplayImage';

const FriendProfile=props=>{
    const friend= props.friends.find(f=>f.my_friend_id==props.id)
  
    const callHandler=()=>{
        let phone_number= props.phone_number.replace(/-/g, "").replace(/' '/g, "").slice(props.phone_number.length-10, props.phone_number.length )
        
        Linking.openURL(`tel:${phone_number}`) 
    }

    const emailHandler=()=>{
        Linking.openURL(`mailto:${props.email}`)
    }
    const getTimePassed=(updatedTime)=>{
        let milliseconds=Date.now() - new Date(updatedTime)
        let timePassed
        let seconds = Math.round(milliseconds/1000)
        let minutes=Math.round(milliseconds/(1000*60))
        let hours=Math.round(minutes/60)
        let days=Math.round(hours/24)
        let weeks=Math.round(days/7)
        let years=Math.round(weeks/52)
        if(years>0){
            timePassed=`${years} year${years>1 ? 's': ''}` 
        }else if(weeks>0){
            timePassed=`${weeks} week${weeks>1 ? 's': ''}`
        }else if(days>0){
            timePassed=`${days} day${days>1 ? 's': ''}`
        }else if(hours>0){
            timePassed=`${hours} hour${hours>1 ? 's': ''}`
        }else if(minutes>0){
            timePassed=`${minutes} minute${minutes>1 ? 's': ''}`
        }else timePassed=`${seconds} second${seconds>1 ? 's': ''}`
        return timePassed
    }


    const unfriendHandler=()=>{
        // alert(`${friend.my_friend_id} =${props.id}`)
        fetch(`http://fisbum-backend.herokuapp.com/api/v1/friends/${friend.id}`, {method: "DELETE"})
         .catch(error=>alert(error))
        
        
        fetch(`http://fisbum-backend.herokuapp.com/api/v1/users/${props.id}`)
        .then(res=>res.json())
        .then(user=>{
            
            if(user.friends.length>0){
            const frd=user.friends.find(f=> f.my_friend_id==props.currentUser.id)
            

            fetch(`http://fisbum-backend.herokuapp.com/api/v1/friends/${frd.id}`, {method: "DELETE"})
            .catch(error=>alert(error))
        }
                props.unfriend(props.id)
                props.removeRequest(props.id)
        })
    
        props.setModalToggle(false)
    }
    const imgUrl=()=>{
        let score=props.friends.find(f=>f.my_friend_id==props.id).friendship_score

        if(score<100){
            return  <Image style={{height: 20, width: 20}} source={require('../assets/icons8-bronze-ore-48.png')}/>
        } else if(score<1000){
          return  <Image style={{height: 20, width: 20}} source={require('../assets/icons8-silver-ore-48.png')}/>
        } else if(score<5000){
            return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-gold-ore-48.png')}/>
        }else if(score<10000){
            return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-diamond-48.png')}/>
        } else return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-bronze-ore-48.png')}/> 
    }


    const generateQrCode=()=>{
        return(
            <QRCode
            value={`http://fisbum-backend.herokuapp.com/api/v1/users/${props.id}`}
            size={340}
            logo={props.img_url}
            logoBorderRadius={10}
            logoBackgroundColor={'blue'}
            logoMargin={3}
          />
        )
    }
    return(
       <ScrollView>
           <View style={styles.qrView}>
               <TouchableNativeFeedback onPress={()=><DisplayImage type='qr' img={props.img_url} modal={true} id={props.id}/>}>
               {generateQrCode()}
               </TouchableNativeFeedback>
           
           </View>
            <View style={styles.nameView}>
                  
                <View style={styles.profilePicView}>
                    <Thumbnail style={styles.profilePic} square source={{uri: `${props.img_url}`}}/>
                </View> 
                <View style={styles.textView}>
                        
                    <Text>
                        {props.first_name} {props.last_name} {props.sex==='female'
                        ?<Icon name='female' style={{color: 'pink', fontSize:20}}/>
                        : <Icon name='male' style={{color: 'blue', fontSize: 20}}/>}
                    </Text>
                    <Text note numberOfLines={3} >
                        {props.bio} 
                    </Text>
                    <Text>
                    {props.fisbum_count} 🤜 {imgUrl()}
                     </Text>
                     <Text note>Fisbumer for {getTimePassed(props.created_at)}</Text>
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
        marginTop: -25,
       
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