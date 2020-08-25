import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {setCurrentUserAction, unfriendAction, removeRequestAction} from '../actions'
import {  Button,  List, ListItem, Thumbnail, Text } from 'native-base'; 




const SearchResultCard=props=>{

const friend=props.friends.find(f=> f.my_friend_id==props.id)
// console.log('this is in the search result card!', props.friends, 'here it ends')
    const friendHandler=()=>{
        let val
      if(props.currentUser.my_friends.find(friend=> friend.id==props.id)){
      val=<View><Button  bordered onPress={unfriendHandler}><Text style={{padding: .5 }}>Unfriend</Text></Button></View>
      }else if(props.currentUser.requestings.find(req=>req.id==props.id)){
          val=<View><Button bordered><Text>Cancel Request</Text></Button></View>
      }
      else if(props.currentUser.requesters.find(req=>req.id==props.id)){
        val=<View><Button bordered onPress={addFriendHandler}><Text>Accept Request</Text></Button></View>
        
    }else if(props.currentUser.id==props.id){
        val=<View><Button bordered><Text>Add Myself</Text></Button></View>
    }else val=<View><Button bordered onPress={addFriendHandler}><Text>Friend</Text></Button></View>
    return val
    }

    const unfriendHandler=()=>{
        fetch(`http://fisbum-backend.herokuapp.com/api/v1/friends/${friend.id}`, {method: "DELETE"})
         .catch(error=>alert(error))
        
        
        fetch(`http://fisbum-backend.herokuapp.com/api/v1/users/${props.id}`)
        .then(res=>res.json())
        .then(user=>{
            const frd=user.friends.find(f=> f.my_friend_id==props.currentUser.id)

            fetch(`http://fisbum-backend.herokuapp.com/api/v1/friends/${frd.id}`, {method: "DELETE"})
            .catch(error=>alert(error))
                props.unfriend(props.id)
                props.removeRequest(props.id)
        })
    
        
    }

    const addFriendHandler=()=>{
        fetch('http://fisbum-backend.herokuapp.com/api/v1/requests',{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                requesting_id: props.id,
                requester_id: props.currentUser.id
            })
        })
        .then(res=>res.json())
        .then(updatedCurrentUser=>{
            props.setCurrentUser(updatedCurrentUser)
        })
        .catch(error=>console.log(error))
    }

    

    const renderUserDetails=()=>{
        return(
            <List>
                <ListItem>
                    <View style={styles.listView}>
                        <Thumbnail source={{uri: `${props.img_url}`}}/>
                        <View>
                             <Text>{props.first_name}</Text>
                             <Text note>@{props.username}</Text>
                        </View>
                      
                        {friendHandler()}
                    </View>  
                </ListItem>
            </List>

        )
       
    }

   
    const renderNoResultText=()=>{
        return(
            <View>
                 <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginBottom:10
                    }}
                    />
            <Text style={{alignSelf: 'center'}}>
               
                No user found!
            </Text>
        </View>
        )
    }
        return (
            <View>
                {props.id?renderUserDetails():renderNoResultText()}
            </View>
        )
    }


    const styles=StyleSheet.create({
        listView: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
           

        },
        buttonView: {
            padding: 10
        },
        textView: {
            alignItems: 'center',
            flex: 1

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
            setCurrentUser: (updatedCurrentUser)=> dispatch(setCurrentUserAction(updatedCurrentUser)),
            unfriend: (id)=>dispatch(unfriendAction(id)), 
            removeRequest: (id)=>dispatch(removeRequestAction(id))
        }
    }


export default connect(msp, mdp)(SearchResultCard)