import React, { useState } from 'react'
import {  View } from 'react-native'
import  {Text, Thumbnail,Button , Icon, Form, Label, Input, Item, Image} from 'native-base'
import {connect} from 'react-redux'
import { set } from 'react-native-reanimated'


const EditProfile=(props)=>{
    const [editUser, setEditUser]=useState({})
    const [user, setUser]=useState(props.currentUser)

    const displayNameEdit=()=>{
        return(
            editUser.name
                ?
                <View>
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
                        <View>
                            <Button onPress={()=>setEditUser({...editUser, name: false})}>
                                <Text>
                                    Save Changes
                                </Text>
                            </Button>
                            <Button  danger onPress={()=>setEditUser({...editUser, name: false})}>
                                <Text>
                                    Cancel
                                </Text>
                            </Button>
                        </View>
                    </Form>
                </View>
                :<View>
                <Text>
                    {props.currentUser.first_name} {props.currentUser.last_name}
                </Text>
                <Button transparent onPress={()=>setEditUser({...editUser, name: true})}>
                    
                    <Text>
                        Edit Name
                    </Text>
                </Button>
            </View>
                    
        )
    }

    const disPlayDetailEdit=()=>{
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
                         <View>
                             <Button>
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
    return(
        <View>
            <View>
                <Thumbnail source={{uri: props.currentUser.img_url}} style={{height: 70, width: 70}}/>
                <Button transparent >
                    <Icon name='camera' />
                </Button>
            </View>
            {displayNameEdit()}
            <Button block transparent onPress={()=>setEditUser({...editUser, editDetails: true})}>
            
                    <Text>
                        Edit Details
                    </Text>
                    <Icon name='more' position='right'/>
                  
            </Button>
            {disPlayDetailEdit()}
            <Button block transparent onPress={()=>setEditUser({...editUser, changePassword: true})}>
            
                    <Text>
                        Change Password
                    </Text>
                    <Icon name='eye' position='right'/>
            </Button>
            {
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
                        <View>
                             <Button>
                                 <Text>Save Changes</Text>
                             </Button>
                             <Button danger transparent onPress={()=>setEditUser({...editUser, changePassword: false})}>
                                 <Text>Cancel</Text>
                             </Button>
                         </View>
                        
                    </Form>
                </View>
            }
        </View>
    )
}


const msp=state=>{
    return{
        currentUser: state.currentUser
    }
}
export default  connect(msp)(EditProfile) 