import React, { useState } from 'react'
import {View, TextInput,StyleSheet, Modal} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect} from 'react-redux';
import {setCurrentUserAction, setSignUpModalToggleAction} from '../actions'
import SignUp from '../components/SignUp';

const AuthScreen=props=>{
    const [user, setUser]=useState({
        username: '',
        password: ''
    })
   
   


    const usernameChangeHandler=(input)=>{
        setUser({
         ...user,   username: input.nativeEvent.text.toLowerCase()
        })
    }

    const passwordChangeHandler=(input)=>{
        setUser({
          ...user,  password: input.nativeEvent.text
        })

    }
    const loginHandler=()=>{
        console.log(props.setUser)
        fetch(`http://fisbum-backend.herokuapp.com/api/v1/users/search_user/${user.username}`)
        .then(res=>res.json())
        .then(person=>{
            if(person.message!==''){
                person.password===user.password?props.setUser(person):window.alert('wrong Credentials!')
            }
        })
        .catch(error=> window.alert(`error is ${error}`))
     
    }
    return(
            <Container>
                <Header>
                   <View>
                        <Text>
                            LogIn
                        </Text>
                    </View> 
                </Header>
                <Content>
                <Form>
                    <View style={styles.inputContainer}>
                        <Item floatingLabel>
                            <Label>Username / email / mobile number</Label>
                            <Input value={user.username} name='username'  onChange={usernameChangeHandler}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true}
                                value={user.password}
                                onChange={passwordChangeHandler}
                            />
                        </Item>
                    </View>
                    <View style={styles.button}>
                        <Button block success onPress={loginHandler}>
                             <Text>Sign In</Text>
                        </Button>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button transparent onPress={props.setNewUserModalToggle}>
                            <Text>new user? sign up</Text>
                        </Button>
                        <Button transparent>
                            <Text>Forgot Password??</Text>
                        </Button>
                    </View>
                    
                        {props.newUser && <SignUp/>}
                   
                </Form>
                </Content>
            </Container>
    )
}




const styles=StyleSheet.create({
    button:{
 
        margin: "2%",
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            shadowOffsetWidth: 0, 
            setShadowOffsetWidth: 1}
    },
    inputContainer: {
        margin: '2%',
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '2%'
        
    }
    
})
const msp=state=>{
    return{
        newUser: state.signUpModalToggle
    }
}

const mdp = dispatch => {
    return {
      setUser: (person) => dispatch(setCurrentUserAction(person)),
      setNewUserModalToggle: ()=>dispatch(setSignUpModalToggleAction())
    }
  }


export default connect(msp, mdp )(AuthScreen)