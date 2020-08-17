import React, { useState } from 'react'
import {  View , ScrollView, Dimensions, StyleSheet} from 'react-native'
import  {Text, Thumbnail,Button,DatePicker,List, ListItem,Left, Body, Right, Switch , Icon, Form, Label, Input, Item, Image} from 'native-base'
import {connect} from 'react-redux'
import { setAccountDisabledAction, setCurrentUserAction } from '../actions'




const EditProfile=(props)=>{
    const [editUser, setEditUser]=useState({})
    const [user, setUser]=useState(props.currentUser)

    const displayNameEdit=()=>{
        return(
            editUser.name
                &&
                <View style={{width: Dimensions.get('window').width*.7}}>
                    <Form>
                        <Item>
                        <Label>
                            First Name
                        </Label>
                        <Input value={user.first_name}/>
                        </Item>
                        <Item>
                        <Label>
                            Last Name
                        </Label>
                        <Input value={user.last_name}/>
                        </Item>
                        <View style={styles.buttonView}>
                            <Button transparent onPress={()=>setEditUser({...editUser, name: false})}>
                                <Text>
                                    Save Changes
                                </Text>
                            </Button>
                            <Button  danger transparent  onPress={()=>setEditUser({...editUser, name: false})}>
                                <Text>
                                    Cancel
                                </Text>
                            </Button>
                        </View>
                    </Form>
                </View>
                
                    
        )
    }

    const disPlayDetailEdit=()=>{
    const   date=new Date(props.dob)
        return (
            editUser.editDetails &&
                <View>
                     <Form>
                         <Item>
                             <Label>
                                 Bio
                             </Label>
                             <Input name='bio' value={user.bio}/>
                         </Item>
                         <Item>
                             <Label>
                                 Email
                             </Label>
                             <Input name='email' value={user.email}/>
                         </Item>
                         <Item>
                             <Label>
                                 Phone Number
                             </Label>
                             <Input name='phone_number' value={user.phone_number}/>
                         </Item>
                         <Item>
                             <Label>
                                 Username
                             </Label>
                             <Input name='username' value={`${user.username}`}/>
                         </Item>
                         <Item>
                         
                         <DatePicker
                        defaultDate={new Date(user.dob)}
                        minimumDate={new Date(1918, 1, 1)}
                        maximumDate={new Date(2018, 12, 31)}
                        locale={"US"}

                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        
                        disabled={false}
                        />
                  
                        </Item>
                         <View style={styles.buttonView}>
                             <Button transparent>
                                 <Text>Save Changes</Text>
                             </Button>
                             <Button danger transparent onPress={()=>setEditUser({...editUser, editDetails: false})}>
                                 <Text>Cancel</Text>
                             </Button>
                         </View>
                     </Form>
                 </View>
             
        )
    }

    const displayChangePassword=()=>{
        return(
            editUser.changePassword &&
                <View>
                    <Form>
                        <Item>
                            <Label>Current Password</Label>
                            <Input name='currentPassword'/>
                        </Item>
                        <Item>
                            <Label>New Password</Label>
                            <Input name='currentPassword'/>
                        </Item>
                        <Item>
                            <Label>Confirm New Password</Label>
                            <Input name='currentPassword'/>
                        </Item>
                        <View style={styles.buttonView}>
                             <Button transparent >
                                 <Text>Save Changes</Text>
                             </Button>
                             <Button danger transparent onPress={()=>setEditUser({...editUser, changePassword: false})}>
                                 <Text>Cancel</Text>
                             </Button>
                         </View>
                        
                    </Form>
                </View>
        )
    }
    const displayPrivacyChange=()=>{
        return(
            editUser.changePrivacy&&
            <View>
            <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#06f" }}>
                <Icon active name="hand" />
              </Button>
            </Left>
            <Body>
              <Text>Private</Text>
            </Body>
            <Right>
              <Switch onValueChange={()=>setEditUser({...editUser, changePrivacy: !editUser.changePrivacy})}   value={user.pvt} />
            </Right>
          </ListItem>
            </View>
        )
    }
    const displayAccountSettings=()=>{
        return(
            editUser.changeAccountSettings&&
                <View>
                    <List>
                        <ListItem>
                            <Left>
                                <Button danger transparent>
                                    <Icon active name="trash" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Disable Account</Text>
                            </Body>
                            <Right>
                                <Switch onValueChange={()=>props.setAccountDisabled()}   value={props.accountDisabled} />
                            </Right>
                            
                            
                        </ListItem>
                        
                        {props.accountDisabled&&
                        <ListItem>
                            <Text note>Sad to see you go! But you can always come back and make you account active within 14 days before delete your account from the server.</Text>
                        </ListItem>
                            }
                        <ListItem>
                            <Button transparent block onPress={()=>props.setUser(null)}>
                                <Text>Log Out</Text>
                                <Icon name='log-out' position='right'/>
                            </Button>
                        </ListItem>
                        
                    </List>
                </View>
        )
    }
    return(

        <ScrollView>
           <View style={styles.nameAndProfilePicView}>
            <View style={{width: '35%'}} >
                <Thumbnail source={{uri: props.currentUser.img_url}} style={{height: 70, width: 70}}/>
                <Button transparent  style={styles.cameraButton}>
                    <Icon name='camera' style={{fontSize: 35}}/>
                </Button>
            </View>
            <View>
                <Text>
                    {props.currentUser.first_name} {props.currentUser.last_name}
                </Text>
                <Button transparent onPress={()=>setEditUser({...editUser, name: true})}>
                    
                    <Text>
                        Edit Name
                    </Text>
                </Button>
                
            
                {displayNameEdit()}
                </View>
            </View>
            <List> 
                <ListItem> 
                    <Button block transparent onPress={()=>setEditUser({...editUser, editDetails: true})}>
                        <Text>
                            Edit Details
                        </Text>
                        <Icon name='more' position='right'/>
                    </Button>                  
                 </ListItem>
                        {disPlayDetailEdit()}
                
                <ListItem>                        
                    <Button block transparent onPress={()=>setEditUser({...editUser, changePassword: true})}>
                    
                            <Text>
                                Change Password
                            </Text>
                            <Icon name='lock' position='right'/>
                    </Button>
                </ListItem>
                {displayChangePassword()}
                <ListItem>
                    
                    <Button block transparent onPress={()=>setEditUser({...editUser, changePrivacy: !editUser.changePrivacy})}>
                    
                        <Text>
                            Privacy
                        </Text>
                        <Icon name='eye' position='right'/>
                    </Button>
                    
                </ListItem>
                {displayPrivacyChange()}
                <ListItem>
                    <Button block transparent onPress={()=>setEditUser({...editUser, changeAccountSettings: !editUser.changeAccountSettings})}>
                    
                        <Text>
                            Account Settings
                        </Text>
                        <Icon name='settings' position='right'/>
                    </Button>
                
                </ListItem>
                {displayAccountSettings()}
            </List>  
        </ScrollView>
        
    )
}

const styles=StyleSheet.create({
  nameAndProfilePicView:{
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      width: Dimensions.get('window').width*.7,
  },
  buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      
  }, 
  cameraButton: {
      marginTop: -38,
      marginLeft: 8
  }
})


const msp=state=>{
    return{
        currentUser: state.currentUser,
        accountDisabled: state.accountDisabled
    }
}
const mdp=d=>{
    return{
        setAccountDisabled: ()=>d(setAccountDisabledAction()),
        setUser: (user)=>d(setCurrentUserAction(user))
    }
}
export default  connect(msp, mdp)(EditProfile) 