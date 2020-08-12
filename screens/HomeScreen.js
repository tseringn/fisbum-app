import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { Container, Header, Content,SwipeRow, List, Button, Icon, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fisbuming from '../components/Fisbuming'
import Fisbumer from '../components/Fisbumer'



const HomeScreen=(props)=>{
    return(
        
        <ScrollView>
           <SafeAreaView>

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
               {props.fisbumings.map(fis=><Fisbumer key={fis.id} {...fis} bgColor={'rgba(0,0,200,.05)'} />)}
            </View>
            </SafeAreaView>
        </ScrollView>
        
    )
}

   const  styles=StyleSheet.create({
    textView: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,200,0,.2)',
        borderRadius: 20,
    }
        
    })


    const msp=state=>{
        return{
            fisbumings: state.currentUser.fisbumings,
            fisbumers: state.currentUser.fisbumers
        }
    }

export default connect(msp)(HomeScreen)