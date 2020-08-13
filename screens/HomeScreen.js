import React, { useState } from 'react'
import {View, StyleSheet, ScrollView, Dimensions, Modal} from 'react-native'
import {connect} from 'react-redux'
import { Container, Form, Item, Label, Input, Header, Content,SwipeRow, List, Button, Icon, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fisbuming from '../components/DisplayImage'
import Fisbumer from '../components/Fisbumer'
import { setCurrentUserAction } from '../actions';
import {showMessage} from 'react-native-flash-message'



const HomeScreen=(props)=>{
    const [modalToggle, setModalToggle]=useState(false)
    const [status, setStatus]=useState('') 

  const   statusUpdateHandler=()=>{
        fetch(`http://127.0.0.1:3000/api/v1/users/${props.currentUser.id}`,{
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(res=>res.json())
        .then(user=>{
            props.setCurrentUser(user)
            showMessage({
                message: `Status Posted!`,
                type: "success",
                 icon: "success",
               
              });
            setStatus('')
            setModalToggle(false)
        })
        .catch(error=> alert(error))
    }

    const renderModal=()=>{
        return (
            <Modal visible={modalToggle}
            transparent={true}
            animated='slide'
            >
            <Container style={styles.container}>
                
            
                
            
                <View style={{height: 300}}>
                <Form style={styles.modalView}>
                    <Item floatingLabel>
                        <Label>Tell your friends where you up to...</Label>
                        <Input
                         numberOfLines={4}
                          value={status}
                           name='username' 
                           multiline
                           maxLength={120}
                           style={{height: 200}}
                            onChange={(val)=>setStatus(val.nativeEvent.text)}/>
                    </Item>
                        
                    <View style={styles.buttonView}>
                    <Button transparent  onPress={statusUpdateHandler}>
                         <Text>post</Text>
                         {/* <Icon name='done'/> */}
                    </Button>
                    <Button danger transparent  onPress={()=>{setModalToggle(false)}}>
                         <Text>Cancel</Text>
                         {/* <Icon name='done'/> */}
                    </Button>
                    </View>
                    
                    
                    </Form>
                </View>
           
                
                
            </Container>
        </Modal>
        )
    }

    return(
        <View>
            <Header style={styles.header}>
                <View style={styles.headerView}>
                
                <Thumbnail source = {require('../assets/fisbum.png')} square style={styles.logo}/>
             
                    <Button info transparent onPress={()=>setModalToggle(true)}>
                       <View style={styles.addIconView}><Icon name='add' style={styles.addIcon}/></View> 
                    </Button>
               
                
                </View>
                
            </Header>
            
                {renderModal()}
       

        <ScrollView style={styles.scrollView}>
          
            <View>
              <View style={styles.textView}>
              <Text style={{color: 'white'}}>Friends waiting for your fisbum</Text>
             </View> 
                {props.fisbumers.map(fis=><Fisbumer key={fis.id} bgColor={'rgba(0,200,0,.05)'} {...fis}/>)}
            </View>
            <View>
            <View style={{...styles.textView, backgroundColor: 'rgba(0,0,200,.05)'}}>
               <Text style={{color: 'white'}}>Friends you fisbumed</Text>
            </View>
               {props.fisbumings.map(fis=><Fisbumer key={`fisbuming${fis.id}`} {...fis} bgColor={'rgba(0,0,200,.05)'} />)}
            </View>
            
        </ScrollView>
    </View>
    )
}

   const  styles=StyleSheet.create({
    textView: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,200,0,.2)',
        borderRadius: 20,
    },
    header: {
        backgroundColor: 'white',
        shadowOffset: {
            height: 3,
            width: 0
        }, 
        shadowColor: 'grey',
        shadowOpacity: .9,
        shadowRadius: 2
    },
    scrollView: {
       paddingTop: 5
       
    },
    headerView: {
        width: Dimensions.get('window').width*.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        
    },
    logo: {
        width: 150,
        height: 60
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width*.85,
        height: 340,
       
        borderRadius: 20
    },
     container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        },
        buttonView:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 0
            
        },
        addIcon: {
            fontSize: 30,
           
           
        },
        // addIconView: {
        //     alignItems: 'center',
        //     backgroundColor: 'white',
        //     shadowOffset: {
        //         height: 0,
        //         width:2
        //     },
        //     height: 40,
        //     width: 40,
        //     shadowRadius: 2,
        //     shadowOpacity: .9,
        //     shadowColor: 'blue',
        //     borderRadius: 40
        // },
        
        
    })


    const msp=state=>{
        return{
            currentUser: state.currentUser,
            fisbumings: state.currentUser.fisbumings,
            fisbumers: state.currentUser.fisbumers
        }
    }
    const mdp=dispatch=>{
        return{
            setCurrentUser: (user)=>dispatch(setCurrentUserAction(user))
        }
    }

export default connect(msp, mdp)(HomeScreen)