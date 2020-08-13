import React, { useState } from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import BestieCard from '../components/BestieCard'
import QRCode from 'react-native-qrcode-svg';
import { 
    Header, 
    Content, 
    List, 
    ListItem, 
    Thumbnail, 
    Text, 
    Left, 
    Button, 
    Icon} from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import DisplayImage from '../components/DisplayImage';
import { setImgModalToggleAction } from '../actions';



const ProfileScreen=(props)=>{




const renderBesties=()=>{
    let sortedFriends=props.currentUser.friends.sort((friendA, friendB)=>{
        if(friendA.friendship_score>friendB.friendship_score){
            return 1
            
        }else return -1
    })
    let count=0
    return sortedFriends.map(friend=>{
        if(count<5){
        let fr=props.currentUser.my_friends.find(fr=>fr.id==friend.my_friend_id)
        count++ 
        return  <BestieCard key={fr.id} {...fr} />
        }  
    })
}

const generateQrCode=()=>{
    return(
        <QRCode
        value={`http://localhost:3000/api/v1/users/${props.id}`}
        size={40}
      />
    )
}
    return(
        <>
   
       
        <Content>
            <Header>
                <Text style={{fontSize: 30, padding: 10}}>
                    {props.currentUser.first_name}
                </Text>
            </Header>
                <View style={styles.profileDetails}>
              
                        <Thumbnail style={styles.profilePic} square source={{ uri: `${props.currentUser.img_url}` }} />
                        
                        <View style={{justifyContent: 'center'}}>
                            <Text>@{props.currentUser.username}</Text>
                            <Text note numberOfLines={1}>{props.currentUser.bio}</Text>
                            <Text>🤜 {props.currentUser.fisbum_count}</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>

                            {generateQrCode()}
                            <TouchableNativeFeedback onPress={props.setModalToggle }>
                                <Icon name='open'/>
                            </TouchableNativeFeedback>
                            {props.modalToggle&&<DisplayImage type='qr' modal={true} id={props.id}/>}
                        </View>
            </View>
         
           
             
            
            <View style={styles.editButton}>
                <Button bordered block>
                    <Text>Edit Profile</Text>
                </Button>
            </View>
            
            <View style={styles.bestieView}>
                {renderBesties()} 
                </View>
                 
        <Text>
            status:
            {props.currentUser.status}
        </Text>
        </Content>
    
      
    </>
    )
}

const msp=state=>{
    return{
        currentUser: state.currentUser,
        modalToggle: state.imgModalToggle
    }
    
}

const mdp=dispatch=>{
    return{
        setModalToggle: ()=>dispatch(setImgModalToggleAction())
    }
}
const styles=StyleSheet.create({
    editButton: {
        flex: 1,
        justifyContent: 'center',
        width: '80%',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '10%',
        marginTop: 10,

    },
    profilePic: {
        width: 100,
        height: 100
    },
    bestieView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
        

    },
    profileDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        backgroundColor: "rgba(186,98,0,.05)",

        
    }
})

export default connect(msp, mdp)(ProfileScreen) 