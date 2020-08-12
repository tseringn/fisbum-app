import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {connect} from 'react-redux'
import { Marker } from 'react-native-svg';
const RenderMap=props=> {
 const friend=props.friends.find(f=>f.id==props.id)

 const getTimePassed=(updatedTime)=>{
    let milliseconds=Date.now() - new Date(updatedTime)
    let timePassed
     let seconds = Math.round(milliseconds/1000)
     let minutes=Math.round(milliseconds/(1000*60))
     let hours=Math.round(minutes/60)
     let days=Math.round(hours/24)
     let weeks=Math.round(days/7)
     let years=Math.round(weeks/52)
     if(years>0){
         timePassed=`${years} year${years>1 ? 's': ''}` 
     }else if(weeks>0){
         timePassed=`${weeks} week${weeks>1 ? 's': ''}`
     }else if(days>0){
         timePassed=`${days} day${days>1 ? 's': ''}`
     }else if(hours>0){
         timePassed=`${hours} hour${hours>1 ? 's': ''}`
     }else if(minutes>0){
         timePassed=`${minutes} minute${minutes>1 ? 's': ''}`
     }else timePassed=`${seconds} second${seconds>1 ? 's': ''}`
     return timePassed
 }

    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        initialRegion={{
            latitude: parseFloat(friend.latitude),
            longitude: parseFloat(friend.longitude),
            latitudeDelta: 0.000922,
            longitudeDelta: 0.00021,
        }}>
            <MapView.Marker
           
            coordinate={{latitude: parseFloat(friend.latitude),
            longitude: parseFloat(friend.longitude) }}
            image={friend.img_url}
            title={`${friend.first_name}'s location`}
            description={`${getTimePassed(friend.updated_at)} ago`}
         />
        </MapView>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '85%',
    height: 500,
  },
});

const msp=state=>{
    return{
        friends: state.currentUser.my_friends
    }
}

export default connect(msp)(RenderMap)