import React, { useState, useEffect } from 'react'
import {View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Modal, Image, TouchableHighlight} from 'react-native'
import { Container, Header, Content,SwipeRow, List, Button, Icon, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {connect} from 'react-redux'
import {showMessage} from 'react-native-flash-message'
import { setCurrentUserAction } from '../actions';
const Fisbumer=props=>{
    const styles=StyleSheet.create({
        nameProfilePicView: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between' 
        },
        mainView: {
            flex: 1,
            padding: 10,
            width: '95%',
            backgroundColor: props.bgColor,
            shadowColor: 'grey',
            borderRadius: 25,
            borderColor: 'grey',
            borderWidth: 0,
            marginVertical: 7
            
        },
        bioTextView: {
            maxWidth: '70%'
        },
        profilePic: {
            alignItems: 'center',
            marginLeft: -5
        },
        fisbumView: {
            alignItems: "center",
            marginLeft: -10,
            marginRight: 10
        }
    })

    const body=()=>{
     return    props.bgColor==='rgba(0,200,0,.05)'?
            {fisbuming_id: props.currentUser.id, fisbumer_id: props.id}
             :{fisbumer_id: props.currentUser.id, fisbuming_id: props.id}
    }

    const imgUrl=()=>{
        let score=props.currentUser.friends.find(f=>f.my_friend_id==props.id).friendship_score
        switch(score){
            case score<=1000: return  <Image style={{height: 20, width: 20}} source={require('../assets/icons8-bronze-ore-48.png')}/>
            case score<=5000: return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-silver-ore-48.png')}/>
            case score<=10000: return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-gold-ore-48.png')}/>
            case score>=10000: return <Image style={{height: 20, width: 20}} source={require('../assets/icons8-diamond-48.png')}/>
            default: return <Image source={require('../assets/icons8-bronze-ore-48.png')}/> 
        }
    }


    const [fisbum, setFisbum]=useState(null)
   


        const getFisbum=()=>{

            fetch('http://localhost:3000/api/v1/fisbums/get_fisbum',{
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body())
            })
            .then(res=>res.json())
            .then(res=>{
                setFisbum(res)
                
            })
            .catch(error=>alert(error))
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

        const  fisbumHandler=()=>{
  
            if(props.currentUser.fisbumings.find(fs=>fs.id==props.id)){
                showMessage({
                    message: `You already fisbumed ${props.first_name}`,
                    type: "info",
                  });  
            } else{
                fetch('http://localhost:3000/api/v1/fisbums',{
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        fisbumer_id: props.currentUser.id,
                        fisbuming_id: props.id
                    })
                })
                .then(res=>res.json())
                .then(res=>{
                    props.setCurrentUser(res)
                    showMessage({
                        message: `Fisbumed ${props.first_name}`,
                        type: "success",
                         icon: "success",
                       
                      }); 
                })
                .catch(error=>alert(error))
            }  
        }
    
        useEffect(getFisbum, [])
        return(
            <TouchableOpacity onLongPress={fisbumHandler}>
            <View style={{alignItems: 'center'}}>
                 <View style={styles.mainView}>
                        <View style={styles.nameProfilePicView}>
                            <View>
                                <Text>{props.first_name}</Text>
                                <Text note numberOfLines={3}> {props.bio}</Text>
                                <Text note >{imgUrl()}</Text>
                                <Text note >Yeah! {props.fisbum_count}</Text>
                                
                            </View>
                            <View style={styles.profilePic} >
                                <Thumbnail source={{uri: `${props.img_url}`}}/>
                                <View >
                                <Text note>@{props.username}</Text>
                                </View>
                                
                            </View> 
                            
                        </View>
                        <View>
                        <Text note style={{color: 'green'}} > status:</Text>
                        <Text > {props.status}</Text>
                        </View>
                        <View >
                            <Text note style={{textAlign: 'right'}}> {fisbum?`${getTimePassed(fisbum[0].updated_at)} ago`:'just now'}</Text>
                        </View>
                    
                </View>
            </View>
         </TouchableOpacity>
        )
}



const msp=state=>{
    return{
        currentUser: state.currentUser,

    }
    
}
    const mdp=dispatch=>{
        return{
            setCurrentUser: (user)=>dispatch(setCurrentUserAction(user))
        }
    }
export default connect(msp,mdp)(Fisbumer)