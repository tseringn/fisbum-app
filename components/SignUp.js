import React, {useState} from 'react'
import {View, StyleSheet, Dimensions, Modal} from 'react-native'
import { Button, Icon, Text, Form, Item, Label, Input} from 'native-base'
import { setSignUpModalToggleAction } from '../actions'
import {connect} from 'react-redux'
  


const SignUp=props=>{
    const [showForm, setShowForm]=useState('name')

    const renderNameForm=()=>{
        return(
         <Form >
                    <Item floatingLabel>
                        <Label>what is your first name?</Label>
                        <Input
                        name='first_name' 
                          />
                    </Item>
                    <Item floatingLabel>
                        <Label>Can i have your last name too?</Label>
                        <Input
                        name='last_name' 
                          />
                    </Item>
                        
                    <View>
                    <Button transparent onPress={()=>setShowForm('email')} >
                         <Text>Start</Text>
                    </Button>
                    </View>
        </Form>     
        )
    }

    const renderEmailAndPhoneNumber=()=>{
        return(
            <Form >
                <Item floatingLabel>
                    <Label>Need your email address</Label>
                    <Input
                    email
                    name='email' 
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Phone number if you don't mind 😀</Label>
                    <Input
                    tel
                    keyboardType="numeric"
                    name='phone_number' 
                    />
                </Item>
                    
                <View style={styles.buttonGroupView}>
                <Button danger transparent  onPress={()=>setShowForm('name')}>
                    <Icon name='arrow-back'/>
                    <Text>Back</Text>
                </Button>
                <Button transparent onPress={()=>setShowForm('verify')} >
                    <Text>Continue</Text>
                    <Icon name='arrow-forward'/>
                </Button>
                </View>
         </Form>
        )
    }
    const renderEmailVerification=()=>{
        return(
            <Form >
                <Text note style={{marginLeft: 5}}>We have sent you one time password to your email, it is valid only 5 minutes</Text>
                <Item floatingLabel>
                    <Label>One Time Password</Label>
                    <Input
                    
                    name='otp' 
                    />
                </Item>
                    
                <View style={styles.buttonGroupView}>
                <Button danger transparent  onPress={()=>setShowForm('email')}>
                    <Icon name='arrow-back'/>
                    <Text>Back</Text>
                </Button>
                <Button transparent  >
                    <Text>Continue</Text>
                    <Icon name='arrow-forward'/>
                </Button>
                </View>
         </Form>
        )
    }
    return(
        <View style={styles.modalView}>
            <Modal visible={props.newUser} animated='fade'>
            <View style={styles.nameModalView}>
            <Button 
            transparent
            style={styles.goBackButtonStyle}
            onPress={props.setNewUserModalToggle}
            >
                <Icon name='close'/>
                <Text style={{marginLeft: -25}}>close</Text>
            </Button>
        {showForm==='name' && renderNameForm()}
        {showForm==='email' && renderEmailAndPhoneNumber()}
        {showForm==='verify'&&renderEmailVerification()}
        </View>
        </Modal>
    </View>
    )
}

const styles=StyleSheet.create({
    modalView: {
        
        alignSelf: 'center',
        alignItems:'center',
        width: Dimensions.get('window').width*.98,
        height: Dimensions.get('window').height*.6,
    },
    nameModalView: {
       marginTop: 15,
      
        width: Dimensions.get('window').width*.98,
        height: Dimensions.get('window').height*.6,
        alignSelf: 'center',
        
       
       
    },
    goBackButtonStyle: {
        marginVertical: 15
    },
    buttonGroupView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
                
    }
})

const msp=state=>{
    return{
        newUser: state.signUpModalToggle
    }
}
const mdp=dpc=>{
    return{
        setNewUserModalToggle: ()=>dpc(setSignUpModalToggleAction())
    }
    
}

export default connect(msp, mdp)(SignUp) 