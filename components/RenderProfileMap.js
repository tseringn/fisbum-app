import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux'
import { Marker } from 'react-native-svg';
import { Thumbnail } from 'native-base';
const RenderMap=props=> {
 const frds=props.friends.filter(f=>!f.private)

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

 const renderMarker=(user)=>{

    return(
    <MapView.Marker
    key={user.id}
    coordinate={{latitude: parseFloat(user.latitude),
    longitude: parseFloat(user.longitude) }}
    title={`${user.first_name}'s last location`}
    description={`${getTimePassed(user.updated_at)} ago`}
    style={{width: 30, height: 20}}
    resizeMode='contain'
 >
     <View style={styles.imageView}>
         <Thumbnail source={{uri: `${user.img_url}`}}/>
     </View>

    
 </MapView.Marker>
 )
}
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        initialRegion={{
            latitude: parseFloat(props.currentUser.latitude),
            longitude: parseFloat(props.currentUser.longitude),
            latitudeDelta: 0.000922,
            longitudeDelta: 0.00021,
        }}>
            {renderMarker(props.currentUser)}
            {frds.map(f=> renderMarker(f))}
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
    width: '95%',
    height: 500,
    shadowColor: 'rgb(16,222,222)',
    shadowOffset: {
        with: 6, 
        height:6
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  imageView: {
    shadowColor: 'rgb(162,2,222)',
    textShadowOffset: {
        with: 0, 
        height:6
    },
    shadowRadius: 6,
    shadowOpacity: 1

}
});

const msp=state=>{
    return{
        friends: state.currentUser.my_friends,
        currentUser: state.currentUser
    }
}

export default connect(msp)(RenderMap)