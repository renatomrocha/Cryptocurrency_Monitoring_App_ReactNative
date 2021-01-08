import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import generalStyles from '../generalStyles';
import { Modal, Portal, Provider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';



export default class Home extends Component {


  constructor(props){
    super(props);
    this.state = {
      visible: false,
      username : props.route.params.user.user._docs[0]?props.route.params.user.user._docs[0]._data.username:null,
      email: props.route.params.user.user._docs[0]?props.route.params.user.user._docs[0]._data.email:null
    }

   
  
  }

  logout = () => {
    console.log("Vou tentar dar o logout")
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));  
  }



  
  showModal = () => {
    this.setState({visible: true})
  }

  hideModal = () => {
    this.setState({visible: false})
  }



  render() {
    return (
      
      <Provider style={styles.container}>

          <View style={styles.header}>
            <View style={{marginRight: '20%', flexDirection: 'column', justifyContent:'center'}}>
            <Image style={{ alignSelf:'center',marginLeft:20, width: 40, height:40}} source={require('../img/Logo_6.png')}></Image>
            <Text style={{alignSelf:'center',  fontSize: 20 ,fontWeight:'bold', color: '#BCBCBC'}}>Magnify</Text>
            </View>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>User information</Text>
              <Text style={styles.info}>Username: {this.state.username}</Text>
              <Text style={styles.info}>E-mail: {this.state.email}</Text>
              {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
              <View style={{width:'100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={this.showModal} style={styles.buttonContainer}>
                <Text style = {{color: 'white'}}>Edit Profile</Text>  
              </TouchableOpacity>              
            
              <TouchableOpacity onPress={this.logout} style={styles.buttonContainer}>
                <Text style = {{color: 'white'}}>Logout</Text>  
              </TouchableOpacity> 
              </View>
              <Portal>
              <Modal visible={this.state.visible} onDismiss={this.hideModal} contentContainerStyle={ {backgroundColor: 'white', padding: 20, height:'60%'}}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
              </Modal>
              </Portal>
            </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: generalStyles.mainColor,
    height:100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },
  container:{
    backgroundColor: generalStyles.background,
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    marginLeft:50,
    alignSelf:'flex-start',
    position: 'absolute',
    marginTop:60,
    backgroundColor:generalStyles.background,
    zIndex:3
  },
  name:{
    fontSize:22,
    paddingLeft:20,
    backgroundColor:generalStyles.background,
    fontWeight:'600',
    color: 'white'
  },
  body:{
    backgroundColor: generalStyles.background,
    flex: 3
  },
  bodyContent: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft:30,
    padding:30,
    backgroundColor: generalStyles.background
  },
  name:{
    fontSize:28,
    color: "white",
    fontWeight: "600",
    marginTop: 20
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    backgroundColor: generalStyles.background
  },
  description:{
    fontSize:16,
    color: "white",
    marginTop:10,
    textAlign: 'center',
    
  },
  buttonContainer: {
    marginTop:10,
    height:30,
   
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    width:100,
    borderRadius:30,
    backgroundColor: generalStyles.mainColor,
  },
});
