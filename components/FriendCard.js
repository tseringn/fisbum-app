import {connect} from 'react-redux'
import React, {useState} from 'react'
import {View, StyleSheet, SafeAreaView,  TouchableOpacity, Modal} from 'react-native'
import { Container, Header, Content,SwipeRow, List, Button, Icon, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { FlatList, } from 'react-native-gesture-handler';
import FriendProfile from './FriendProfile';




const FriendCard=props=>{
    const [selectedItem, setSelectedItem ]=useState(null)
    const [modalToggle, setModalToggle]=useState(false)
    // console.log(props.my_friends, 'this is my friends from FriendCard')
    const findFriend=id=>{
        // console.log('this is from find friend an score is : ', props.friends.find(f=>f.my_friend_id==id).friendship_score)
      return  props.friends.find(f=>f.my_friend_id==id).friendship_score
    }



    const Item = ({ item, onPress}) => (
                        <View>
                            
                        <List>
                            <ListItem>
                                <View style={styles.listItemView}>
                                
                                
                                    <Thumbnail source={{uri: `${item.item.img_url}`}}/>
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
                                        <Text>
                                            {findFriend(item.item.id)?'hi!':findFriend(item.item.id)}
                                        </Text>
                                    </View>
                                </View>  
                            </ListItem> 
                        </List>
                            
                            
                    </View>
      );

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
                        >
                            <Icon name='arrow-back' />
                            <Text>
                                Go Back
                            </Text>
                        </Button>
                       
                        <FriendProfile {...friend}/>
                   
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
       friends: state.currentUser.friends,
       my_friends: state.currentUser.my_friends
    }
}

const styles=StyleSheet.create({
header: {
    height: 10
},
listItemView:{
    flexDirection: 'row', 
    flex: 1,
    alignItems: 'center',
    
},
nameView: {
    alignItems: 'center',
    marginLeft: '4%'
},
nameText: {
    textAlign:'left' 
}, 
fisbum: {
    shadowOffset: {
        width: 2,
        height: 2
    }, 
    shadowColor: 'black',
    shadowRadius: 12
}

})

export default connect(msp)(FriendCard) 

