import {connect} from 'react-redux'
import React, {useState} from 'react'
import { showMessage, hideMessage } from "react-native-flash-message";
 
import {View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Modal, Image, TouchableHighlight} from 'react-native'
import { Container, Header, Content,SwipeRow, List, Button, Icon, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { FlatList, } from 'react-native-gesture-handler';
import FriendProfile from './FriendProfile';

import {setCurrentUserAction} from '../actions'




const FriendCard=props=>{
    const [selectedItem, setSelectedItem ]=useState(null)
    const [modalToggle, setModalToggle]=useState(false)
    // console.log(props.my_friends, 'this is my friends from FriendCard')
    // const findFriend=id=>{
    //     // console.log('this is from find friend an score is : ', props.friends.find(f=>f.my_friend_id==id).friendship_score)
    //   return  props.friends.find(f=>f.my_friend_id==id).friendship_score
    // }
    const imgUrl=(id)=>{
        let score=props.friends.find(f=>f.my_friend_id==id).friendship_score
        if(score<100){
            return  <Image style={{height: 30, width: 30}} source={require('../assets/icons8-bronze-ore-48.png')}/>
        } else if(score<1000){
          return  <Image style={{height: 30, width: 30}} source={require('../assets/icons8-silver-ore-48.png')}/>
        } else if(score<5000){
            return <Image style={{height: 30, width: 30}} source={require('../assets/icons8-gold-ore-48.png')}/>
        }else if(score<10000){
            return <Image style={{height: 30, width: 30}} source={require('../assets/icons8-diamond-48.png')}/>
        } else return <Image style={{height: 30, width: 30}} source={require('../assets/icons8-bronze-ore-48.png')}/> 
    }

  const  fisbumHandler=(frd)=>{
  
        if(props.currentUser.fisbumings.find(fs=>fs.id==frd.id)){
            showMessage({
                message: `You already fisbumed ${frd.first_name}`,
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
                    fisbuming_id: frd.id
                })
            })
            .then(res=>res.json())
            .then(res=>{
                props.setCurrentUser(res)
                showMessage({
                    message: `Fisbumed ${frd.first_name}`,
                    type: "success",
                     icon: "success",
                   
                  }); 
            })
            .catch(error=>alert(error))
        }  
    }



    const Item = ({ item, onPress, onLongPress, level}) => {
        
    return(
                            
                    <List>
                         <ListItem>
                             <TouchableOpacity onLongPress={onLongPress}>
                            <View style={styles.listItemView}>

                                    <View style={styles.profilePicView}>
                                        <Thumbnail 
                                        style={{marginRight: 0}}
                                        source={{uri: `${item.item.img_url}`}}/>
                                    </View>
                                <View style={styles.nameScoreView}>
                                     <View style={styles.nameView}>
                                        
                                            <TouchableOpacity onPress={onPress}>
                                                <Text style={styles.nameText}>
                                                        {item.item.first_name} 
                                                </Text>
                                                <Text note style={styles.nameText} >
                                                        @{item.item.username} 
                                                </Text>
                                            </TouchableOpacity>
                                    </View>
                                    <View style={styles.fisbum}>
                                            {level()}
                                    </View>
                                </View>
                            </View> 
                            </TouchableOpacity> 
                        </ListItem> 
                    </List>
                          

                            
                            
                    
      );
    }

    const renderModal=friend=>{
        return(
            <Modal visible={modalToggle}
                 style={styles.modal} 
                transparent={true}
                animated={'slide'}
                >
                    
                     <Container style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0, .3)'
                       
                       
                        }}>
                  
                        <View style={{
                              
                              backgroundColor: 'white',
                                marginBottom: 0,
                              borderRadius: '15%',
                               
                                width: '95%',
                                height: '88%',
                                
                            }}>
                                
                            
                        <Button
                        iconLeft small transparent
                        onPress={()=>setModalToggle(false)}
                        style={{marginTop: 5}}
                        >
                            <Icon name='arrow-back' />
                            <Text>
                                Go Back
                            </Text>
                        </Button>
                       
                        <FriendProfile {...friend} setModalToggle={setModalToggle}/>
                   
                        </View>
                     
                    </Container>
                
             </Modal>
        )
    }
    const setModalSelectedItemState=(item)=>{
        setSelectedItem(item)
        setModalToggle(true)
    }

    const renderItem=(item)=>{
        // console.log('this is item',item.item, 'inside renderItem')
        return (
       <Item
       item={item}
       onPress={() => setModalSelectedItemState(item.item)}
       onLongPress={()=>fisbumHandler(item.item)}
       level={()=>imgUrl(item.item.id)}
       />
        )
    }
    
   
    return(
        <SafeAreaView>
        
        <FlatList
        data={props.my_friends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedItem}
        />
       {renderModal(selectedItem)}
     
      </SafeAreaView>
     );
      
    
}

const msp=state=>{
    return {
        currentUser: state.currentUser,
       friends: state.currentUser.friends,
       my_friends: state.currentUser.my_friends
    }
}
const mdp=dispatch=>{
    return{
        setCurrentUser: (updatedCurrentUser)=> dispatch(setCurrentUserAction(updatedCurrentUser)),
    }
}

const styles=StyleSheet.create({
header: {
    height: 10
},
listItemView:{
    flexDirection: 'row', 
    flex: 1,
    justifyContent: 'flex-start',
    
    
    
    
},
nameView: {
    marginLeft: "4%"
    
},
nameText: {
    textAlign:'left',
}, 
fisbum: {
    shadowOffset: {
        width: 2,
        height: 2
    }, 
    shadowColor: 'black',
    shadowRadius: 12,
    
},
profilePicView: {
    maxWidth: '50%'

},
nameScoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width*.75
}

})

export default connect(msp, mdp)(FriendCard) 

