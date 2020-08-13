import React, { useState } from 'react'
import {Dimensions, View, Modal, Image, StyleSheet} from 'react-native'
import {  Button,  List, ListItem, Thumbnail, Text, Container,  Icon } from 'native-base'; 
import QRCode from 'react-native-qrcode-svg';
import {connect} from 'react-redux'
import { setImgModalToggleAction } from '../actions';
const DisplayImage=props=>{
    
    
    const generateQrCode=()=>{
        return(
            <QRCode
            value={`http://localhost:3000/api/v1/users/${props.id}`}
            size={400}
          />
        )
    }
    const getImage=()=>{
        return(
            <Image source={props.img_url}/>
        )
    }
    return(
        
        <Modal
        visible={props.modalToggle}
        style={{height: 700, width: 400}}
        transparent={true}
        >
            <Container style={styles.container}>
                <View style={styles.modalView}>
                    <Button transparent  onPress={()=>props.setModalToggle(false)}>
                    <Icon name='close' style={{fontSize: 40}}/>
                    </Button>
                
                    <View style={styles.imageView}>
                    {props.type==='qr'?generateQrCode():getImage()}
                    </View>
                </View>
            </Container>
            
        </Modal>
    
    )
}
 const styles=StyleSheet.create({
     container: {
        flex: 1,
         alignItems: 'center',
         backgroundColor: 'black',
         justifyContent: 'center',
         
     },
     modalView: {
         
         height: 400,
         width: 400
     },
     imageView: {
         height: 400, 
         width: 400,
         flex: 1,
         alignItems: 'center'

     }
 })
 const msp=state=>{
     return{
         modalToggle: state.imgModalToggle
     }
 }
 const mdp=dispatch=>{
     return{
        setModalToggle: ()=>dispatch(setImgModalToggleAction())
     }
 }

export default connect(msp, mdp)(DisplayImage)