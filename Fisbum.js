import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect} from 'react-redux';
import ScreenContainer from './containers/ScreenContainer'
import AuthScreen from './screens/AuthScreen'




const  Fisbum =(props)=> {
 
  return (
        props.currentUser
        ?<ScreenContainer/>
        :<AuthScreen/>  
  );
}
const mapStateToProps = state => { //msp
    return {
     currentUser: state.currentUser
    }
  }
  
//   const mapDispatchToProps = dispatch => { //mdp
//     return {
    
//     }
//   }
export default connect(mapStateToProps)(Fisbum)