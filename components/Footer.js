import React, { Component } from "react";
import {View, Text, Image} from "react-native";
import generalStyles from '../generalStyles';

class Footer extends React.Component{

    render() {
        return (
          // Try setting `justifyContent` to `center`.
          // Try setting `flexDirection` to `row`.
      
            <View style={{width: '100%', flexDirection: 'row',height: 60, backgroundColor: generalStyles.mainColor, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Image style={{ alignSelf:'center',marginLeft:20, width: 40, height:40}} source={require('../img/Logo_6.png')}></Image>
              <Text style={{alignSelf:'center', padding : 10, fontSize: 20, fontWeight:'bold', color: '#BCBCBC'}}>Magnify</Text>
            </View>
        
        );
      }

}

export default Footer;