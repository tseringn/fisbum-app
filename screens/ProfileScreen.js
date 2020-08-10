import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import BestieCard from '../components/BestieCard'
import { 
    Container,
    Header, 
    Content, 
    List, 
    ListItem, 
    Thumbnail, 
    Text, 
    Left, 
    Body, 
    Right, 
    Button } from 'native-base';



const ProfileScreen=(props)=>{
const renderBesties=()=>{
    let sortedFriends=props.currentUser.friends.sort((friendA, friendB)=>{
        if(friendA.friendship_score>friendB.friendship_score){
            return 1
            
        }else return -1
    })
    let count=0
    return sortedFriends.map(friend=>{
        if(count<4){
        let fr=props.currentUser.my_friends.find(fr=>fr.id==friend.my_friend_id)
        count++ 
        return  <BestieCard {...fr} />
        }  
    })
}
    return(
        <>
   
       
        <Content>
            <Header>
                <Text style={{fontSize: 30, padding: 10}}>
                    {props.currentUser.first_name}
                </Text>
            </Header>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail style={styles.profilePic} square source={{ uri: `${props.currentUser.img_url}` }} />
              </Left>
              <Body>
                <Text>@{props.currentUser.username}</Text>
                <Text note numberOfLines={1}>{props.currentUser.bio}</Text>
                <Text>Fisbums: {props.currentUser.fisbum_count}123</Text>
              </Body>
              
         
           
             
            </ListItem>
          </List>
            <View style={styles.editButton}>
                <Button bordered block>
                    <Text>Edit Profile</Text>
                </Button>
            </View>
            
            <View>{renderBesties()}</View>
                 
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
        currentUser: state.currentUser
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
    }
})

export default connect(msp)(ProfileScreen) 