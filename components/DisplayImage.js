import React, { useState } from 'react'
import {Dimensions,  Share, View, Modal, Image, StyleSheet} from 'react-native'
import {  Button,  List, ListItem, Thumbnail, Text, Container,  Icon , Fab} from 'native-base'; 
import QRCode from 'react-native-qrcode-svg';
import {connect} from 'react-redux'
import { setImgModalToggleAction } from '../actions';
const DisplayImage=props=>{
    const [fabToggle, setFabToggle]=useState(false)
    const  onShare = async () => {
        try {
          const result = await Share.share({
            message: 'Scan my Qr-Code to connect me!',
            url: props.img
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    const generateQrCode=()=>{
        const base64=props.img
        return(
            <QRCode
            value={`http://fisbum-backend.herokuapp.com/api/v1/users/${props.id}`}
            size={Dimensions.get('window').width*.95}
            logo={base64}
            logoBorderRadius={10}
            logoBackgroundColor={'blue'}
            logoMargin={3}
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
                <Fab
                        active={fabToggle}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#50a7FF' }}
                        position="bottomRight"
                        onPress={() => setFabToggle(!fabToggle)}>
                        <Icon name="share" />
                        <Button   onPress={onShare} title="Others" >
                        <Icon name='share'/>
                        </Button>
                        <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="logo-whatsapp" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                        </Button>
                        
                    </Fab>
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
         
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'white', 
         height: 430,
         width: Dimensions.get('window').width
     },
     imageView: {
         marginVertical: 10,
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



