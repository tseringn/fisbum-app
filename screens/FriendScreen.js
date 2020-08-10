import React from 'react'
import {useState} from 'react'
import {View, StyleSheet, Modal} from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

import {connect} from 'react-redux'
import FriendCard from '../components/FriendCard'

import {setSearchResultAction} from '../actions'

import SearchResultCard from '../components/SearchResultCard'

import { ScrollView } from 'react-native-gesture-handler';

const FriendScreen=(props)=>{

    // const renderFriendList=()=>{
    //  return    props.my_friends.map(friend=> <FriendCard key={friend.id}{...friend}/>)
    // }


    const [searchKey, setSearchKey]=useState('')
    const [modalToggle, setModalToggle]=useState(false)

    const searchInputHandler=(input)=>{
        
        setSearchKey(input.nativeEvent.text)
        // console.log(input.nativeEvent.text)
    }

    const  searchHandler=()=>{
       if(searchKey!==''){
        fetch(`http://localhost:3000/api/v1/users/search/${searchKey}`)
        .then(res=>res.json())
        .then(result=>{
            
            if(result){
            props.setResult(result)
            setSearchKey('')
            setModalToggle(true)
            }
            
            
        })
        .catch(error => window.alert(error))
      }  
    }
  
    const renderResultCard=()=>{
        if(props.searchResult){
             return props.searchResult.length?props.searchResult.map(user=> <SearchResultCard key={user.id} {...user}/>)
                    :<SearchResultCard {...props.searchResult}/>
        }
       
    }  
    
    
    const renderModal=()=>{
        return(
            
                <Modal visible={modalToggle} style={styles.modal} 
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
                               
                                width: 350,
                                height: 590,
                                
                            }}>
                                
                         
                        <Icon
                        name='close'
                        style={styles.icon}
                        onPress={()=>setModalToggle(false)}
                        />
                        <ScrollView>
                        {renderResultCard()}
                        </ScrollView>
                        
                   
                        </View>
                     
                    </Container>
                
             </Modal>
           
        )
    }
    
      
    

    return(
      
            <Container>
                <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" 
                        value = {searchKey}
                        onChange={searchInputHandler}
                    />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent onPress={searchHandler}>
                    <Text>Search</Text>
                </Button>
                </Header>
                <View>
                    <FriendCard/>
                </View>
                
                {renderModal()}
            </Container>

      
    )
}

const styles=StyleSheet.create({
    modal: {
       
        maxHeight: '80% '
    },
    icon: {
        padding: '4%'
    }
})
 const msp=state=>{
     return{
         searchResult: state.searchResult,
         friends: state.currentUser.friends,
         my_friends: state.currentUser.my_friends
     }
 }

 const mdp=dispatch=>{
     return{
         setResult: (result)=> dispatch(setSearchResultAction (result))
     }
 }

export default connect(msp, mdp)(FriendScreen)