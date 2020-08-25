
import React from 'react';
import { connect} from 'react-redux';
import ScreenContainer from './containers/ScreenContainer'
import AuthScreen from './screens/AuthScreen'
import { setCurrentUserAction } from './actions';




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
  
  const mapDispatchToProps = dispatch => { //mdp
    return {
    setUser: (user)=>dispatch(setCurrentUserAction(user))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Fisbum)