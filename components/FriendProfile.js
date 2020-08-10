import React from 'react'
import {Modal, View} from 'react-native' 
import {Icon, Container, Text, Thumbnail} from 'native-base'
import QRCode from 'react-native-qrcode-svg';
const FriendProfile=props=>{
    
    const  serialize = (obj)=> {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
    }

    const generateQrCode=()=>{
        return(
            <QRCode
            value="https://www.youtube.com/watch?v=YP_gkymnj-0"
          />
        )
    }
    return(
       <View>
           <Thumbnail square source={{uri: `${props.img_url}`}}/>

           <Text>
               {props.first_name}
           </Text>
           {generateQrCode()}
       </View>
    )
}
export default FriendProfile