
import React from 'react';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers/reducer'
import Fisbum from './Fisbum'
import FlashMessage from 'react-native-flash-message'






export default function App() {
  const store=createStore(reducer)
  return (
    <Provider store={store}>
        <Fisbum/>
        <FlashMessage position="center"  duration={1000}/>
    </Provider>
  );
}
